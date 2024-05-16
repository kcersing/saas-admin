import { Form, Input, Button } from '@arco-design/web-react';
const FormItem = Form.Item;
import React, { useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import styles from './index.module.css';

const SignPage = ({SignData}) => {

  const [signTip, setSignTip] = useState('请签名');

  let sigCanvas: any;
  const clearSign = () => {
    sigCanvas.clear();
  };
  const handleSign = () => {
    const img = sigCanvas.toDataURL('image/png');
    SignData(img)
  };

  return (
    <>
      <div className={styles.signContainer}>
      <div className={styles.signContent}>
        <SignatureCanvas
          penColor="#000"
          canvasProps={{
            width: 410,
            height: 200,
            className: styles.canvasContainer
          }}
          ref={ref => {
            sigCanvas = ref;
          }}
          onBegin={() => setSignTip('')}
        />
        {signTip && <div className={styles.signTip}>{signTip}</div>}
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={clearSign} className={styles.clearBtn}>
          清除
        </Button>
        <Button onClick={handleSign} className={styles.signBtn} type="primary">
          签字确认
        </Button>
      </div>
    </div>
  </> );
};

export default SignPage;