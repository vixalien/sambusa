import { TopBar } from "@shopify/polaris";
import { useState } from "react";

export function AppTopBar() {
  const [isOpen, setOpen] = useState(false);
  const toggleOpen = () => setOpen((open) => !open);

  return (
    <TopBar
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
