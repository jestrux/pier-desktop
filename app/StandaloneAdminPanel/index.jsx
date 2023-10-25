/* eslint-disable no-mixed-spaces-and-tabs */
import { useHydrated } from "remix-utils";
import { useStandaloneAppContext } from "~/StandaloneApp/StandaloneAppContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function StandaloneAdminPanel() {
	const hydrated = useHydrated();
	const { app, pageProps } = useStandaloneAppContext();
	const { primaryBgTextColor, bannerColor } = pageProps;

	return (
		<>
			<style>
				{!hydrated
					? ""
					: `
					:root {
						--primary-color: ${app.color};
						--heading-text-transform: ${app.settings.uppercaseHeadings ? "uppercase" : ""};
						--heading-font-size: ${app.settings.headingFontSize ?? "1.875rem"};
						--heading-font-family: ${!hydrated ? "" : app.settings.headingFontFamily ?? ""};
						--heading-font-weight: ${app.settings.headingFontWeight ?? "900"};
						--banner-text-color: ${bannerColor};
						--primary-text-color: ${primaryBgTextColor};
					}

					body {
						font-family: ${
							!hydrated
								? ""
								: app.settings.fontFamily ??
								  "'Open Sans', sans-serif"
						};
						font-weight: ${app.settings.fontWeight ?? 500};
					}

					.bg-primary {
						background-color: var(--primary-color);
					}
					
					.bg-accent {
						background-color: #FDFBE9;
					}
					
					.text-primary {
						color: var(--primary-color);
					}

					.text-primary,
					.text-blue-900 {
						color: var(--primary-color, #2c5282) !important;
					}

					.bg-primary {
						background: var(--primary-color, #2c5282) !important;
					}

					* {
						box-sizing: border-box !important;
					}
					.flex-layout,
					.modal {
						display: -webkit-flex;
						display: -ms-flex;
					}

					#container,
					.modal,
					aside {
						height: 100vh;
					}

					.modal {
						position: fixed;
						top: 0;
					}

					.rounded-btn,
					aside li a {
						text-decoration: none;
						text-transform: uppercase;
					}

					#pageTitle::first-letter,
					.rounded-btn,
					.ticket-item .item-title:first-letter,
					aside li a {
						text-transform: uppercase;
					}

					.modal {
						left: 0;
						width: 100vw;
						z-index: 999;
						pointer-events: none;
						opacity: 0;
						display: flex;
						align-items: center;
						justify-content: center;
						background: rgba(0, 0, 0, 0.6);
					}

					#container,
					#userMenu,
					#userMenu #dp,
					aside li a {
						position: relative;
					}

					#userMenu:hover #details,
					.modal.open {
						pointer-events: auto;
						opacity: 1;
					}

					.modal.no-backdrop {
						background-color: transparent;
					}

					.modal .modal-content {
						background-color: #fff;
						border-radius: 3px;
						box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
					}

					.modal .modal-title {
						padding: 12px 16px;
						border-bottom: 1px solid #e5e5e5;
					}

					.modal .modal-title .title {
						font-size: 20px;
						font-weight: 700;
						margin: 0;
						padding: 0;
					}

					.modal .modal-body {
						padding: 30px 16px;
					}

					.modal .modal-buttons {
						display: flex;
						justify-content: flex-end;
						padding: 10px;
						background: #e8e8e8;
					}

					.modal .modal-buttons button {
						margin: 0 8px;
					}

					.summary-card {
						background: #fff;
						margin: 10px;
						min-width: calc(33.333% - 20px);
						box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
						text-align: center;
					}

					.summary-card .card-content {
						padding: 30px 20px 20px;
					}

					.summary-card .card-title {
						display: block;
						font-size: 1.5em;
					}

					.summary-card .card-count {
						display: block;
						font-size: 3em;
						font-weight: 700;
						margin-bottom: 10px;
					}

					.summary-card .card-link {
						display: block;
						border-top: 1px solid #ddd;
						color: #000;
						padding: 12px 12px 20px;
					}

					#mainNav button,
					#mainNav form,
					#mainNav input,
					aside li a {
						display: inline-block;
					}

					#container {
						display: flex;
					}

					aside {
						width: 280px;
						background: #fff;
						box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
						z-index: 2;
						display: flex;
						flex-direction: column;
					}

					aside .long-header {
						font-size: 20px;
						font-weight: bold;
						padding: 24px;
						padding-top: 80px;
						background-color: var(--primary-color, #2c5282);
						color: white;
						display: flex;
						flex-direction: column;
						gap: 0.7rem;
					}

					aside .long-header > div:has(img) {
						margin-top: -40px;
					}

					aside ul {
						padding: 0;
						padding-top: 10px;
						padding-bottom: 10px;
						flex: 1;
						overflow-y: auto;
					}

					aside li {
						list-style-type: none;
					}

					aside li a {
						text-transform: capitalize;
						padding: 14px 24px;
						display: block;
						color: #000;
						font-size: 1rem;
						font-weight: 600;
						border-left: 2.5px solid transparent;
						cursor: pointer;
					}

					aside li a:not(.active) {
						opacity: 0.6;
					}

					aside a.active {
						pointer-events: none;
						color: var(--primary-color, #2c5282);
						border-color: currentColor;
					}

					aside li a:before {
						background-color: var(--primary-color, #2c5282);
						content: "";
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						z-index: -1;
						opacity: 0.08;
					}

					aside li a:not(.active):not(:hover):before {
						opacity: 0;
					}

					main {
						overflow: hidden;
						background: #fafafa;
					}

					#mainNav {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 0 30px;
						min-height: 60px;
						padding-left: 45px;
						background-color: #fff;
						box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
						z-index: 1;
						flex-shrink: 0;
					}

					#pageTitle {
						font-size: 1.28rem;
						letter-spacing: -0.01em;
						font-weight: 700;
						margin: 0 12px;
					}

					#userMenu {
						padding: 10px;
					}

					#userMenu #dp {
						border-radius: 50%;
						background-color: #ddd;
						width: 42px;
						height: 42px;
						overflow: hidden;
						margin: 8px 0;
					}

					#userMenu #dp img {
						position: absolute;
						left: 0;
						top: 0;
						width: 100%;
					}

					#userMenu #details {
						white-space: nowrap;
						position: absolute;
						right: 0;
						top: 0;
						padding: 20px 70px 15px 30px;
						background-color: #fff;
						box-shadow: -2px 1px 12px rgba(0, 0, 0, 0.1);
						overflow: hidden;
						opacity: 0;
						pointer-events: none;
					}

					#userMenu:hover #details {
						transform: none;
						transition: opacity 0.25s ease-out;
					}

					#userMenu #details a,
					#userMenu #details span {
						display: block;
					}

					#mainContent {
						flex: 1;
						overflow-x: auto;
						overflow-y: auto;
					}

					.rounded-btn {
						background-color: transparent;
						text-align: center;
						display: inline-block;
						padding: 8px 20px;
						border-radius: 28px;
						border: 1px solid #999;
						font-size: 12px;
						font-family: verdana;
						color: #000;
						margin-top: 12px;
						min-width: 60px;
					}
					
				`}
			</style>

			<div className="flex h-screen overflow-hidden">
				<Sidebar />
				<main className="flex-1 h-screen overflow-hidden bg-neutral-100">
					<div className="h-screen flex-1 flex flex-col relative">
						<Header />
						<div id="mainContent" className="flex-1 overflow-auto">
							<div className="px-16 py-5">Dashboard content</div>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}
