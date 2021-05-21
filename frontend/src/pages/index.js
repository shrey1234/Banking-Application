import React from "react";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import SendIcon from "@material-ui/icons/Send";
import Demo from "./demoList";

const lists = [
  {
    key: "Saving Accounts",
    label: "Saving Accounts",
    icon: InboxIcon,
    items: [
      {
        key: "Account 1",
        label: "Account 1",
        icon: SendIcon
      },
      {
        key: "Account 2",
        label: "Account 2",
        icon: SendIcon
      }
    ]
  },
  {
    key: "Current Accounts",
    label: "Current Accounts",
    icon: InboxIcon,
    items: [{ key: "Account 1", label: "Account 1", icon: SendIcon }]
  }
];

//lists=lists.concat({key: "Saving Accounts1",label: "Saving Accounts1",icon: InboxIcon})
export default function Home() {
        return <Demo lists={lists} />;
}