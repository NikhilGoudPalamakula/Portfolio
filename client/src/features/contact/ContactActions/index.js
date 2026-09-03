import { Mail, Phone, Copy, Check, FileDown } from 'lucide-react';
import { PROFILE, RESUME } from '@/content';
import Button from '@/components/Button';
import BrandIcon from '@/components/BrandIcon';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import styles from './ContactActions.module.scss';

const MAIL_TO = `mailto:${PROFILE.email}?subject=${encodeURIComponent("Let's connect")}`;

const ContactActions = () => {
  const { copied, copy } = useCopyToClipboard();

  return (
    <>
      <p className={styles.lead}>
        Open to new opportunities. The quickest way to reach me is email.
      </p>

      <div className={styles.actions}>
        <Button variant="solid" href={MAIL_TO}>
          <Mail size={15} /> {PROFILE.email}
        </Button>

        <Button href={`tel:${PROFILE.phone.replace(/\s/g, '')}`}>
          <Phone size={15} /> {PROFILE.phone}
        </Button>

        <Button onClick={() => copy(PROFILE.email)}>
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? 'Copied' : 'Copy email'}
        </Button>

        {RESUME.href && (
          <Button href={RESUME.href} download={RESUME.filename}>
            <FileDown size={15} /> {RESUME.label}
          </Button>
        )}

        {PROFILE.socials.map((s) => (
          <Button key={s.label} href={s.href}>
            <BrandIcon name={s.brand} /> {s.label}
          </Button>
        ))}
      </div>
    </>
  );
};

export default ContactActions;
