import styles from "./Header.module.scss";
import {TAB} from "../../constants/Tab";

const Header = ({setTab}) => {
  return (<div className={styles.header}>
    <h4 className={styles.tab} onClick={() => setTab(TAB.ADD_NEWS)}>Add news</h4>
    <h4 className={styles.tab} onClick={() => setTab(TAB.ALL_NEWS)}>News</h4>
  </div>)
};

export default Header;
