import { DefaultTheme } from "vitepress";

const NavConfig: DefaultTheme.NavItem[] = [
	{ text: "首页", link: "/" },
	{
		text: "前端",
		items: [
			{ text: "JavaScript", link: "/web/javascript/事件循环（渡一）" },
			{ text: "Vue", link: "/web/vue/Vue基础" },
			{ text: "React", link: "/web/react/react18-hooks-api" },
			{ text: "Flutter", link: "/web/flutter/安装" },
		],
	},
	{ text: "Next", link: "/next/项目搭建" },
	{ text: "网络相关", link: "/network/DNS解析的过程" },
];

export default NavConfig;
