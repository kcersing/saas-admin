import React from 'react';
import { Upload, Progress } from '@arco-design/web-react';
import { IconPlus, IconEdit } from '@arco-design/web-react/icon';

function AvatarUpload() {
  const [file, setFile] = React.useState();
  const cs = `arco-upload-list-item${file && file.status === 'error' ? ' is-error' : ''}`;
  return (
    <div>
      <Upload
        action='/'
        fileList={file ? [file] : []}
        showUploadList={false}
        onChange={(_, currentFile) => {
          setFile({
            ...currentFile,
            url: URL.createObjectURL(currentFile.originFile),
          });
        }}
        onProgress={(currentFile) => {
          setFile(currentFile);
        }}
      >
        <div className={cs}>
          {file && file.url ? (
            <div className='arco-upload-list-item-picture custom-upload-avatar'>
              <img src={file.url} />
              <div className='arco-upload-list-item-picture-mask'>
                <IconEdit />
              </div>
              {file.status === 'uploading' && file.percent < 100 && (
                <Progress
                  percent={file.percent}
                  type='circle'
                  size='mini'
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translateX(-50%) translateY(-50%)',
                  }}
                />
              )}
            </div>
          ) : (
            <div className='arco-upload-trigger-picture'>
              <div className='arco-upload-trigger-picture-text'>
                <IconPlus />
                <div style={{ marginTop: 10, fontWeight: 600 }}>Upload</div>
              </div>
            </div>
          )}
        </div>
      </Upload>
    </div>
  );
}

export default AvatarUpload;