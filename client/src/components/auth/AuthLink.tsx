import {default as NextLink, LinkProps} from "next/link";
import {Link} from "@chakra-ui/react";

type AuthLinkProps = Pick<LinkProps, "href"> & {
  content: string;
  className?: string;
};

const AuthLink: React.FC<AuthLinkProps> = (props) => {
  return (
    <NextLink href={props.href} passHref>
      <Link m={3}> {props.content}</Link>
    </NextLink>
  );
};

export default AuthLink;
