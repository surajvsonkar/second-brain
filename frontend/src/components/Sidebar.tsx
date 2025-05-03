import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItems } from "./SidebarItem";

export function Sidebar(){
    return <div className="h-screen bg-white border-r w-76 left-0 top-0 fixed">
        <div className="flex text-2xl pl-4 pt-4 items-center">
            <div className="pr-2 text-purple-700">

            <Logo/>
            </div>
        <h1 className="">
            Brainly</h1>
        </div>
        <div className="pt-4">
            <SidebarItems text="Twitter" icon={<TwitterIcon/>}/>
            <SidebarItems text="Youtube" icon={<YoutubeIcon/>}/>
        </div>
    </div>
}