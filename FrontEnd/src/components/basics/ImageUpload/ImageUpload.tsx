import React, { FunctionComponent, ChangeEvent, useState } from 'react';
import { Form, Row } from 'react-bootstrap';
import FilledImage from '@basics/FilledImage';
import Button from '@basics/Button';
import * as z from 'zod';
import { imageUpload, miscIcons } from '@icons';
import cn from 'classnames';
import useRandomID from '@hooks/useRandomID';
import styles from './ImageUpload.module.scss';

interface UploadButtonProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UploadButton: FunctionComponent<UploadButtonProps> = ({ onChange }) => (
  <div className={styles.imageInputWrapper}>
    <label htmlFor="imageUpload" className={styles.imageInputLabel}>
      <imageUpload.Add />
    </label>
    <input
      id="imageUpload"
      type="file"
      onChange={onChange}
      multiple
      accept="image/png, image/jpeg"
      className={styles.imageInput}
    />
  </div>
);

interface IndividualImageProps {
  index: number;
  file: File;
  onDelete: (currentIndex: number) => void;
}

const IndividualImage: FunctionComponent<IndividualImageProps> = ({
  index,
  file,
  onDelete,
}) => {
  const fileUrl = URL.createObjectURL(file);
  const buttonID = useRandomID(undefined);

  return (
    <div className={styles.singleImage} id={buttonID}>
      <div className={styles.deleteWrapperBackground}>
        <Button
          variant="wrapper"
          className={styles.deleteWrapper}
          onClick={() => onDelete(index)}
        >
          <imageUpload.Delete className={styles.delete} />
        </Button>
      </div>
      <FilledImage
        src={fileUrl}
        alt="uploaded images"
        className={styles.roundImage}
      />
    </div>
  );
};

interface ImageUploadProps {
  photosHandler?: (photos: File[]) => any;
  initialFiles: File[];
  error?: string | z.ZodIssue;
}

const UPLOAD_SIZE_LIMIT = 6;

/* The Beautiful Image Uploader
Notes: the limit of this uploader is 6 due to how it was designed.
It has a fixed width and height and would resize based on
different screen sizes.
Usage: to use it, simply provide it with an optional photosHandler
for handling the files updated inside the image uploader
*/
const ImageUpload: FunctionComponent<ImageUploadProps> = ({
  photosHandler,
  error,
  initialFiles,
}) => {
  const [files, setFiles] = useState<File[]>(initialFiles);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const newFiles = [...files, ...Array.from(e.target.files)].slice(
        0,
        UPLOAD_SIZE_LIMIT,
      );
      setFiles(newFiles); // only keep 6 files if user attempt to upload more than 6
      if (photosHandler) {
        photosHandler(newFiles);
      }
      e.target.value = ''; // set the value to empty string so that we allow people upload the same images multiple times
    }
  };
  const onDelete = (currentIndex: number) => {
    const newFiles = files.filter((_, index) => index !== currentIndex);
    setFiles(newFiles);
    if (photosHandler) {
      photosHandler(newFiles);
    }
  };

  return (
    <div className={styles.contentWrapper}>
      <Row className={styles.imagesWrapper}>
        {files.map((file, index) => (
          <IndividualImage
            file={file}
            index={index}
            onDelete={onDelete}
            key={file.name}
          />
        ))}
        {files.length !== UPLOAD_SIZE_LIMIT
          && (files.length ? (
            <div className={cn(styles.singleImage, 'd-flex')}>
              <UploadButton onChange={onChange} />
            </div>
          ) : (
            <UploadButton onChange={onChange} />
          ))}
      </Row>
      <div className={cn(styles.error)}>
        {error && <miscIcons.alert className={styles.inputStatus} />}
        {error && <Form.Label>Please upload at least 2 pictures.</Form.Label>}
      </div>
    </div>
  );
};

export default ImageUpload;
