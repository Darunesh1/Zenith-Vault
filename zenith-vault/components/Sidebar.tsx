'use client'
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import  Link  from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const Sidebar = ({user}:SiderbarProps) => {

    const pathname = usePathname();
  return (
    <section className="sidebar">
        <nav className="flex flex-col gap-4">
            <Link href="/" className="mb-12 cursor-pointer items-center flex gap-2">
            <Image 
            src="/icons/logo.svg"
            width={40} height={40}
            alt="Zenith-Vault"
            className="size-[24px] max-xl:size-14"
            />
            <h1 className="sidebar-logo">Zenith-vault</h1>
            </Link>
            {sidebarLinks.map((i)=>
            {          
                const isActive = pathname=== i.route || pathname.startsWith(`${i.route}/`) 
                return(
                    <Link href={i.route} key={i.label}
                    className={cn
                        ('sidebar-link',{'bg-bank-gradient':isActive})}
                    >
                        <div className="relative size-6">
                            <Image src={i.imgURL}
                                   alt={i.label}
                                   fill
                                   className={cn({'brightness-[3] invert-0':isActive})}
                                   /> 

                        </div>
                        <p className={cn('sidebar-label',
                            {'!text-white':isActive}
                        )}>
                            {i.label}
                        </p>
                        
                    </Link>
                )
            })
            }
            USER

        </nav> 
        FOOTER
    </section>
  )
}

export default Sidebar
