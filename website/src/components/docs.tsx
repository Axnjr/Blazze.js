import Create from "./docs/create";
import Structure from "./docs/structure";
import Conventions from "./docs/conventions";
import StartBuilding from "./docs/start";

export default function Docs() {
    return (
        <div className='w-full h-fit relative mt-40 pt-20 text-center m-auto overflow-hidden flex flex-col justify-center items-center'>
            <div className='w-fit h-fit p-4 bg-black dark:bg-white rounded-full my-6'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} className="w-16 h-16 dark:stroke-black stroke-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
            </div>

            <h1 className='text-4xl sm:text-5xl md:text-5xl tracking-tighter font-[700] px-12 leading-9'>
                Start Building with Blazze.js
            </h1>

            <div className='px-8 md:px-0 max-w-xl m-auto mt-12 mb-10 text-md  text-neutral-500'>
                Not a new framework for you to learn, Zero learning curve, built to enhance developer experience.
                Get started by checking out few foundational rules of blazze.
            </div>

            <section className="w-full h-fit pb-40 flex-col flex gap-16 mt-16">
                <Create />
                <Structure />
                <Conventions />
                <StartBuilding />
            </section>

            <div className="w-full h-fit grid place-items-center -mt-20 pb-20 md:py-20">
                <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tighter font-[700] px-4 my-8">Try it yourself !!</h1>
                <div className="w-11/12 h-screen mt-12 shadow-[0_0_8rem_-0.5rem_#3b82f6] rounded-2xl hidden md:block">
                    <iframe src="https://codesandbox.io/p/devbox/blazze-js-app-3fvzgj?file=%2Fapi%2Fv1%2Fusers%2FGET.ts&embed=1&showConsole=true&layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clrdeay4f0006356hfeczlqeg%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clrdeay4e0002356hdx9yyzhf%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clrdeay4e0004356h1u0953ke%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clrdeay4e0005356hdeii9juj%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clrdeay4e0002356hdx9yyzhf%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clrdeay4d0001356hvynu2dp9%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252FREADME.md%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%252C%257B%2522id%2522%253A%2522clreqay050002356hg5jbfnuh%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522initialSelections%2522%253A%255B%257B%2522startLineNumber%2522%253A5%252C%2522startColumn%2522%253A35%252C%2522endLineNumber%2522%253A5%252C%2522endColumn%2522%253A35%257D%255D%252C%2522filepath%2522%253A%2522%252Fapi%252Fv1%252Fnew%252FGET.ts%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%255D%252C%2522id%2522%253A%2522clrdeay4e0002356hdx9yyzhf%2522%252C%2522activeTabId%2522%253A%2522clreqay050002356hg5jbfnuh%2522%257D%252C%2522clrdeay4e0005356hdeii9juj%2522%253A%257B%2522id%2522%253A%2522clrdeay4e0005356hdeii9juj%2522%252C%2522activeTabId%2522%253A%2522clreqhji400jb356hb6acpu39%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522UNASSIGNED_PORT%2522%252C%2522port%2522%253A3000%252C%2522id%2522%253A%2522clreqhji400jb356hb6acpu39%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522path%2522%253A%2522%252Findex.html%2522%257D%255D%257D%252C%2522clrdeay4e0004356h1u0953ke%2522%253A%257B%2522id%2522%253A%2522clrdeay4e0004356h1u0953ke%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clreqc6u800f8356hhw1qlbhv%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TERMINAL%2522%252C%2522shellId%2522%253A%2522clreqc7zo000dehhw8lxscsnu%2522%257D%255D%252C%2522activeTabId%2522%253A%2522clreqc6u800f8356hhw1qlbhv%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D"
                        className="w-full h-full rounded-lg overflow-hidden hidden md:block"
                        title="Blazze.js App"
                        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                    ></iframe>
                </div>
                <a className="block md:hidden" href="https://codesandbox.io/p/devbox/blazze-js-app-3fvzgj?embed=1&file=%2Fapi%2Fv1%2Fusers%2FGET.ts&showConsole=true">
                    <img alt="Edit Blazze.js App" src="https://codesandbox.io/static/img/play-codesandbox.svg"/>
                </a>
            </div>
        </div>
    )
}