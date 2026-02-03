export interface LngParamsType {
  params: { lng: string; };
}

export interface PageWithIdParamsType {
  params: {
    lng: string;
    id: string;
  };
}

export interface IconPropsType {
  size?: 'small' | 'medium' | 'big';
  color?: 'default' | 'errorRed' | 'mainBlue' | 'successGreen' | 'white';
  className?: string;
}