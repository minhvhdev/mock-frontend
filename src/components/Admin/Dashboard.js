import * as React from 'react';
import Overview from '../Admin/Overview'
function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
        <Overview />
    </>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
