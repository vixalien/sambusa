import { usePathname } from "next/navigation";

import { Navigation } from "@shopify/polaris";
import { HomeIcon } from "@shopify/polaris-icons";

export function AppNavigation() {
  const location = usePathname();

  return (
    <Navigation location={location} logoSuffix={<span>Sambusa</span>}>
      <Navigation.Section
        items={[
          {
            url: "/",
            label: "Dashboard",
            icon: HomeIcon,
            exactMatch: true,
          },
          {
            url: "/dashboard",
            label: "Dashboard2",
            icon: HomeIcon,
          },
        ]}
      />
    </Navigation>
  );
}
