import React, { useEffect, useState } from 'react'
import './index.less'
import { Divider, List, Anchor } from 'antd';
import 'github-markdown-css';
import ReactMarkdown from 'react-markdown';//引入
import remarkGfm from 'remark-gfm';// 划线、表、任务列表和直接url等的语法扩展
import rehypeRaw from 'rehype-raw'// 解析标签，支持html语法
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter' // 代码高亮
//高亮的主题，还有很多别的主题，可以自行选择
import { tomorrow, vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import MarkNav from 'markdown-navbar';
import { useLocation } from 'react-router-dom';
let divElement = ""
function CoursePage() {

    const [isFix, setIsFix] = useState(false);
    const [titles, setTitles] = useState([]);
    const [mdContent, setMdContent] = useState('')
    const location = useLocation();

    useEffect(() => {
        // 获取到md数据后显示md内容和nav
        setTitles(addAnchor());
    }, [mdContent]);

    useEffect(() => {

        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get('id');

        fetch(`/mh/${id}.md`)
            .then(res => res.text())
            .then(text => setMdContent(text));
        divElement = document.getElementById('article-content');
		divElement.addEventListener("scroll", handleScroll);

		return () => {
			divElement.removeEventListener("scroll", handleScroll);
		};
    }, [])

    const handleScroll = () => {
        console.log('handleScroll')
		let scrollTop = divElement.scrollTop; //滚动条滚动高度
		if (scrollTop > 80) {
			setIsFix(true);
		} else {
			setIsFix(false);
		}
	};


    const formatNavItem = (headerDom) => {
        // 将NodeList转换为数组，并提取出需要的属性
        let headerArr = Array.prototype.slice
            .call(headerDom)
            .map((item, index) => {
                let title = {
                    href: "#" + index,
                    key: "" + index,
                    title: headerDom[index].innerText,
                    children: [],
                    nodeName: item.nodeName,
                };
                return title;
            });

        /**
         * (双重循环，从后往前，逐渐将子节点存入父节点children属性)
         * 1. 从后往前，将子标题直接存入前一个父级标题的children[]中
         * 2. 如果前一个标题与当前标题(或标题数组)无直系关系，则直接将当前标题(或标题数组解构后)放入list数组
         * 3. 循环多次，直到result数组长度无变化，结束循环
         */
        let result = headerArr;
        let preLength = 0;
        let newLength = result.length;
        let num = 0;
        while (preLength !== newLength) {
            num++;
            preLength = result.length; // 获取处理前result数组长度
            let list = []; // list数组用于存储本次for循环结果
            let childList = []; // childList存储遍历到的兄弟标题，用于找到父标题时赋值给父标题的children属性
            for (let index = result.length - 1; index >= 0; index--) {
                if (
                    // 当前节点与上一个节点是兄弟节点，将该节点存入childList数组
                    result[index - 1] &&
                    result[index - 1].nodeName.charAt(1) ===
                    result[index].nodeName.charAt(1)
                ) {
                    childList.unshift(result[index]);
                } else if (
                    // 当前节点是上一个节点的子节点，则将该节点存入childList数组，将childList数组赋值给上一节点的children属性，childList数组清空
                    result[index - 1] &&
                    result[index - 1].nodeName.charAt(1) <
                    result[index].nodeName.charAt(1)
                ) {
                    childList.unshift(result[index]);
                    result[index - 1].children = [
                        ...(result[index - 1].children),
                        ...childList,
                    ];
                    childList = [];
                } else {
                    // 当前节点与上一个节点无直系关系，或当前节点下标为0的情况
                    childList.unshift(result[index]);
                    if (childList.length > 0) {
                        list.unshift(...childList);
                    } else {
                        list.unshift(result[index]);
                    }
                    childList = [];
                }
            }
            result = list;
            newLength = result.length; // 获取处理后result数组长度
        }
        return result;
    }

    // const handleClickNavItem = (e, link) => {
	// 	e.preventDefault();
	// 	if (link.href) {
	// 		// 找到锚点对应得的节点
	// 		let element = document.getElementById(link.href);
	// 		// 如果对应id的锚点存在，就跳滚动到锚点顶部
	// 		element &&
	// 			element.scrollIntoView({ block: "start", behavior: "smooth" });
	// 	}
	// };



    const addAnchor = () => {
        // 获取markdown标题的dom节点
        const header = document.querySelectorAll(
            "h1, h2, h3, h4, h5, h6"
        );
        // 向标题中注入id，用于锚点跳转
        header.forEach((navItem, index) => {
            navItem.setAttribute("id", index.toString());
        });
        // 格式化标题数组，用于antd锚点组件自动生成锚点
        let titles = formatNavItem(header);
        return titles;
    };

    console.log('titles', titles)
    return <div className='courseDetail-page'>
        <div className='courseDetail-content'>
            <div id="article-content" className='article-content'>
                <ReactMarkdown
                    className='markdown-body'
                    children={mdContent}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    children={String(children).replace(/\n$/, '')}
                                    style={tomorrow}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                />
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            )
                        }
                    }}
                />
            </div>
            <div className='article-menu'>
            <aside
				// className={`${styles.aside} container`}
				style={isFix ? { position: "fixed", top: 5 } : {}}
			>
				{titles.length > 0 && (
					<Anchor
						className='markdown-nav'
						affix={true}
						offsetTop={100} // 设置距离页面顶部的偏移
						// onClick={handleClickNavItem}
						items={titles}
					></Anchor>
				)}
			</aside>

            </div>
        </div>
    </div>
}

export default CoursePage