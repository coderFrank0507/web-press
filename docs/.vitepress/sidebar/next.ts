import type { DefaultTheme } from "vitepress";
import { URL_next } from "../base_url";

const sidebar_network: DefaultTheme.SidebarItem[] = [
	{ text: "项目搭建", link: `${URL_next}/项目搭建` },
	{
		text: "路由",
		collapsed: false,
		items: [{ text: "App Router", link: `${URL_next}/AppRouter` }],
	},
];

export default sidebar_network;
