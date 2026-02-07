import classes from '@/styles/components/layout/pageTitle.module.scss';

interface Props {
  title: string;
}

function PageTitle({ title }: Props) {
  return (
    <div className={classes.title}>
      <div className={classes.titleBcg} />
      <h1 className={classes.titleText}>{title}</h1>
    </div>
  );
}

export default PageTitle;