import classes from '@/styles/components/layout/pageTitle.module.scss';

interface Props {
  title: string;
}

function PageTitle({ title }: Props) {
  return (
    <h1 className={classes.title}>{title}</h1>
  );
}

export default PageTitle;