import { LinkLikeComponentProps } from "@shopify/polaris/build/ts/src/utilities/link";
import Link from "next/link";

export function AppLink({ url, ...props }: LinkLikeComponentProps) {
  return <Link {...props} href={url ?? props.href ?? ""} />;
}
