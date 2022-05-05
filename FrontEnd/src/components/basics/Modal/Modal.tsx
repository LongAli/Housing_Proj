import { Button, Subtitle1 } from '@basics';
import { Icon as IconType, miscIcons } from '@icons';
import {
  default as MaterialUIModal,
  ModalProps as MaterialUIModalProps,
} from '@material-ui/core/Modal';
import cn from 'classnames';
import React, { FunctionComponent, ReactElement } from 'react';
import styles from './Modal.module.scss';

export type ModalGraphicImage = { src: string; alt?: string };
export type ModalGraphicIcon = { icon: IconType; alt?: string };

const isModalGraphicImage = (
  t: ModalGraphicImage | ModalGraphicIcon,
): t is ModalGraphicImage => 'src' in t;

export interface ModalProps
  extends Omit<
    MaterialUIModalProps,
    'onClose' | 'disableBackdropClick' | 'children'
  > {
  children?: (ReactElement | undefined | false)[];
  size?: 'md' | 'lg';
  title?: string;
  caption?: string;
  ModalGraphic?: string | ModalGraphicImage | ModalGraphicIcon;
  onClose?: (
    event: {},
    reason: 'backdropClick' | 'escapeKeyDown' | 'exitButtonClick',
  ) => any;
  topBar?: ReactElement; // whether we need the default cross button
  parentClassName?: string;
}

/**
 * Modal component. Used for popups. size is 'md' (medium) by default
 *
 * Can optionally provide a a ModalGraphic, a visual/image for the popup,
 * a title, displayed under modal graphic (if provided), and a caption,
 * brief explanation of modal.
 *
 * children can be additional buttons/components unique to specific modal
 *
 * onClose needs to be provied in order to close the popup (with either
 * the exit button or esc)
 *
 */
const Modal: FunctionComponent<ModalProps> = ({
  title,
  caption,
  ModalGraphic,
  children,
  onClose,
  open,
  className,
  size = 'md',
  topBar,
  // default keepMounted is true (necessary for SSR/nextjs, so that it will be sent to client)
  keepMounted = true,
  parentClassName,
  ...passedProps
}) => (
  <MaterialUIModal
    onClose={onClose}
    open={open}
    keepMounted={keepMounted}
    {...passedProps}
    className={cn(styles.materialUIModal, parentClassName)}
    disableBackdropClick
  >
    <div className={cn(styles.modal, styles[size], className)}>
      {topBar || (
        <div>
          <Button
            variant="wrapper"
            className={styles.close}
            onClick={(e) => {
              if (onClose) onClose(e, 'exitButtonClick');
            }}
          >
            <miscIcons.orangeX />
          </Button>
        </div>
      )}
      {ModalGraphic && (
        <div className={styles.ModalGraphic}>
          {typeof ModalGraphic === 'string' ? (
            <img src={ModalGraphic} />
          ) : isModalGraphicImage(ModalGraphic) ? (
            <img src={ModalGraphic.src} alt={ModalGraphic.alt} />
          ) : (
            <ModalGraphic.icon alt={ModalGraphic.alt} />
          )}
        </div>
      )}

      {title && (
        <div className={cn(styles.text, styles.title)}>
          <Subtitle1>{title}</Subtitle1>
        </div>
      )}

      {caption && (
        <div className={cn(styles.text, styles.caption)}>{caption}</div>
      )}

      {children}
    </div>
  </MaterialUIModal>
);

export default Modal;
