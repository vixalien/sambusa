import { TopBar } from "@shopify/polaris";
import { useState } from "react";

export interface AppTopBarProps {
  onNavigationToggle: () => void;
}

export function AppTopBar({ onNavigationToggle }: AppTopBarProps) {
  const [isOpen, setOpen] = useState(false);
  const toggleOpen = () => setOpen((open) => !open);

  return (
    <TopBar
      showNavigationToggle
      onNavigationToggle={onNavigationToggle}
      userMenu={
        <TopBar.UserMenu
          actions={[
            {
              items: [{ content: "Profile" }, { content: "Log Out" }],
            },
          ]}
          name="Johh Doe"
          initials="JD"
          open={isOpen}
          onToggle={toggleOpen}
        />
      }
    />
  );
}
