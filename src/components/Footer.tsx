import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

export default function Footer() {
    return (
        <footer>
            <div className="flex justify-center gap-5 p-2">
                <a href="https://github.com/MuriloCamargo12/fraseando" target="_blank"><IconBrandGithub size={50} className="text-neutral-400 transition-all duration-300 hover:text-white" /></a>
                <a href="https://www.linkedin.com/in/murilo-camargo-morais-9b94463b2/" target="_blank"><IconBrandLinkedin size={50} className="text-neutral-400 transition-all duration-300 hover:text-white" /></a>
            </div>
        </footer>
    )
}