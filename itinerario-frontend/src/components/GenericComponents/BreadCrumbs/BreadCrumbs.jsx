import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkTo from '@mui/material/Link';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function BasicBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <LinkTo underline="hover" color="inherit" href="/">
          <Link to={"/"}>Home</Link>
        </LinkTo>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <Typography color="text.primary" key={name}>
              {name[0].toUpperCase() + name.substring(1)}
            </Typography>
          ) : (
            <LinkTo underline="hover" color="inherit" href={routeTo} key={name}>
              {name}
            </LinkTo>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}