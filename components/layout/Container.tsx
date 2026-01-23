import type { ReactNode } from 'react';
import classes from '@/styles/components/layout/container.module.scss';

interface Props {
  children: ReactNode;
}

const Container = ({ children }: Props) => {
  return (
    <section className={classes.container}>
      {children}
    </section>
  );
};

export default Container;