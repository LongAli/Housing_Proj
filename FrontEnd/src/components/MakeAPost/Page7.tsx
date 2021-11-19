import React, { FunctionComponent } from 'react';
import * as z from 'zod';
import styles from './Page.module.scss';
import { WizardFormStep, ImageUpload, Body1, Subtitle2 } from '@basics';
import cn from 'classnames';

export const page7Schema = z.object({
  photos: z
    .array(typeof window === 'undefined' ? z.any() : z.instanceof(File)) // hacks for nextjs since nodejs doesn't have File type https://github.com/blitz-js/blitz/discussions/2292#discussioncomment-826778
    .min(2), // looking for more elegant solution
});

export type Page7Store = z.infer<typeof page7Schema>;

export const page7InitialStore: Page7Store = {
  photos: [],
};

const Page7: FunctionComponent<
  WizardFormStep<Page7Store> & { validations: any }
> = ({ photos, validations, setStore }) => (
  <div className={styles.pageHeight}>
    <Subtitle2 className={styles.subtitle2}>Pictures</Subtitle2>
    <div className="mb-2">
      <Subtitle2 className={cn(styles.subtitle2, styles.sectionSubtitle2)}>
        Please upload 2 - 6 images for the listing{' '}
        <span className={styles.required}>*</span>
      </Subtitle2>
    </div>
    <div className="d-flex justify-content-center">
      <ImageUpload
        initialFiles={photos || []}
        error={validations?.photos?.error}
        arrayHandler={(photos) => setStore({ photos })}
      />
    </div>
  </div>
);
export default Page7 as FunctionComponent;
