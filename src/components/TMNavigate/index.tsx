interface Props {
  to: string;
  replace?: boolean;
}
const TMNavigate = ({ to, replace }: Props) => {
  window.history[`${replace ? "replace" : "push"}State`](null, "", to);
  return null;
};

export default TMNavigate;
