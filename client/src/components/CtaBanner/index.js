import { ArrowUpRight } from 'lucide-react';
import ContactActions, { MAIL_TO } from '@/components/ContactActions';
import styles from './CtaBanner.module.scss';

// Closes every page with the contact details themselves — there is no
// separate Contact page to send people to.
const CtaBanner = () => (
  <aside className={styles.cta}>
    <span className={styles.kicker}>( Looking for a developer? )</span>
    <a href={MAIL_TO} className={styles.line}>
      Let&apos;s build <em>something</em> <ArrowUpRight size={30} />
    </a>
    <p className={styles.lead}>
      Open to new opportunities. The quickest way to reach me is email.
    </p>
    <ContactActions />
  </aside>
);

export default CtaBanner;
