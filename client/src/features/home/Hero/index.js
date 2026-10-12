import { Mail, ArrowUpRight, FileDown } from 'lucide-react';
import { PROFILE, RESUME } from '@/content';
import Button from '@/components/Button';
import SignalTrace from '@/features/home/SignalTrace';
import StatusLine from '@/features/home/StatusLine';
import styles from './Hero.module.scss';

const MAIL_TO = `mailto:${PROFILE.email}?subject=${encodeURIComponent("Let's connect")}`;

const Hero = () => (
  <>
    <div className={styles.top}>
      <div className={styles.eyebrow}>
        {PROFILE.role} — {PROFILE.location}
      </div>
      <StatusLine />
    </div>

    <h1 className={styles.name}>
      {PROFILE.name.split(' ').map((word, i) => (
        <span className={styles.word} key={`${word}-${i}`}>
          <span className={styles.wordIn} style={{ '--i': i }}>
            {word}
          </span>
        </span>
      ))}
    </h1>

    <SignalTrace />

    <p className={styles.lead}>{PROFILE.tagline}</p>

    <div className={styles.actions}>
      <Button variant="solid" href={MAIL_TO}>
        <Mail size={15} /> Get in touch
      </Button>
      <Button to="/work">
        View work <ArrowUpRight size={15} />
      </Button>
      {RESUME.href && (
        <Button href={RESUME.href} download={RESUME.filename}>
          <FileDown size={15} /> {RESUME.label}
        </Button>
      )}
    </div>
  </>
);

export default Hero;
