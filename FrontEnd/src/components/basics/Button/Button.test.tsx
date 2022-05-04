import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';
// TODO When it is republished, remove the Github reop download and download from NPM
// import CssDimension from 'parse-css-dimension';

const buttonContent = 'Button text';

/**
 * Gets the (parsed) font size of an element
 */
// TODO this is only possible to be used when package is republished
// const getFontSize = (e: Element) => {
//   const sizeStr = getComputedStyle(e).getPropertyValue('font-size');
//   return CssDimension.parse(sizeStr).value;
// };

describe('Button', () => {
  it('should render a primary button with Button text', () => {
    const { getByRole } = render(<Button>{buttonContent}</Button>);
    const button = getByRole('button');

    expect(button).toHaveTextContent(buttonContent);
    // expect(button).toMatchSnapshot();
  });

  it('should render a secondary button with Button text', () => {
    const { getByRole } = render(
      <Button size="secondary">{buttonContent}</Button>,
    );
    const button = getByRole('button');

    expect(button).toHaveTextContent(buttonContent);
    // expect(button).toMatchSnapshot();
  });

  // TODO can't do this until npm package is republished correctly
  // it('should render primary size as bigger than secondary size', () => {
  //   // primary button
  //   const { getByRole: getByRolePrimary } = render(
  //     <Button>{buttonContent}</Button>,
  //   );
  //   const primaryBtn = getByRolePrimary('button');
  //   const primarySize = getFontSize(primaryBtn);

  //   // secondary button
  //   const { getByRole: getByRoleSecondary } = render(
  //     <Button size="secondary">{buttonContent}</Button>,
  //   );
  //   const secondaryBtn = getByRoleSecondary('button');
  //   const secondarySize = getFontSize(secondaryBtn);

  //   expect(primarySize).toBeGreaterThan(secondarySize);
  // });

  // TODO this isn't working for some reason? come back to it...
  // it('should render wrapper variant without padding and margin', () => {
  //   const { getByRole } = render(
  //     <Button variant="wrapper">{buttonContent}</Button>,
  //   );
  //   const button = getByRole('button');

  //   expect(button).toHaveStyle(`
  //     padding: 0;
  //     margin: 0;
  //     background-color: transparent;
  //   `);
  //   expect(button).toMatchSnapshot();
  // });

  // TODO can't do this until you change SVG imports to automatically inject the `img` aria role
  // it('should render a button with an icon in it if an icon was passed', () => {
  //   const { getByRole } = render(
  //     <Button icon={{ icon: contactIcons.email }}>{buttonContent}</Button>,
  //   );
  //   // use `img` aria role for svg, https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Role_Img#svg_and_roleimg
  //   const icon = getByRole('img');
  //   const button = getByRole('button');

  //   expect(icon).toBeInTheDocument();
  //   expect(icon).toBeVisible();
  //   expect(button).toContainElement(icon);
  //   expect(button).toMatchSnapshot();
  // });

  // TODO can't do this until npm package is republished correctly
  // it('should have text with left padding if both icon and text were passed', () => {
  //   const { getByText } = render(
  //     <Button icon={{ icon: contactIcons.email }}>{buttonContent}</Button>,
  //   );
  //   const textWrapper = getByText(buttonContent).parentElement;

  //   expect(textWrapper).not.toBeNull();

  //   const paddingLeftStr = textWrapper
  //     ? getComputedStyle(textWrapper).getPropertyValue('padding-left')
  //     : null;
  //   const paddingLeft = paddingLeftStr
  //     ? CssDimension.parse(paddingLeftStr).value
  //     : null;

  //   expect(paddingLeft).not.toBeNull();
  //   expect(paddingLeft).toBeGreaterThan(0);
  // });

  it('should only have text (i.e. there should be no div text wrapper) if only text is passed through', () => {
    const { getByRole } = render(<Button>{buttonContent}</Button>);
    const button = getByRole('button');

    expect(button.childElementCount).toBe(0);
  });
});
