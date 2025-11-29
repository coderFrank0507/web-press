import type { DefaultTheme } from "vitepress";
import { URL_next } from "../base_url";

const sidebar_network: DefaultTheme.SidebarItem[] = [
	{ text: "项目搭建", link: `${URL_next}/项目搭建` },
	{
		text: "路由",
		collapsed: false,
		items: [
			{ text: "App Router", link: `${URL_next}/AppRouter` },
			{ text: "路由导航", link: `${URL_next}/路由导航` },
			{ text: "动态路由", link: `${URL_next}/动态路由` },
			{ text: "平行路由", link: `${URL_next}/平行路由` },
			{ text: "路由组", link: `${URL_next}/路由组` },
		],
	},
];

export default sidebar_network;
