import Link, { LinkProps } from "next/link"
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react"


interface ActiveLinkProps extends LinkProps {
    children: ReactElement;
    matchExactHref?: boolean;
}

export const ActiveLink = ({ matchExactHref = false, children, ...rest }: ActiveLinkProps) => {
    const router = useRouter();
    const isActive = matchExactHref ? router.asPath === rest.href : (
        router.asPath.startsWith(String(rest.href))
    );

    return (
        <Link {...rest}>
            {cloneElement(children, {
                color: isActive ? 'pink.400' : 'gray.50',
            })}
        </Link>
    )
}