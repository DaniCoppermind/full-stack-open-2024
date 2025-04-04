interface headerProps {
  courseName: string;
}

export const Header = ({ courseName }: headerProps) => {
  return <h1>{courseName}</h1>;
};
