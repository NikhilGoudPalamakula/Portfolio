import { Button, Form, Input, Alert } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLogin } from './services/loginQueries';
import styles from './login.module.scss';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/';

  const { mutate, isPending, isError, error } = useLogin({
    onSuccess: () => navigate(redirectTo, { replace: true }),
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign in</h1>
        <p className={styles.subtitle}>Enter your credentials to continue.</p>

        {isError && (
          <Alert
            className={styles.alert}
            type="error"
            showIcon
            message={error?.response?.data?.message || 'Login failed'}
          />
        )}

        <Form layout="vertical" onFinish={mutate} requiredMark={false}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}
          >
            <Input placeholder="you@example.com" autoComplete="email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Enter your password' }]}
          >
            <Input.Password placeholder="••••••••" autoComplete="current-password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={isPending}>
            Sign in
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
