import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import FormField from './FormField';
import Button from './Button';

test('fields expose unique labels and associated validation guidance', () => {
  render(<><FormField label="Email" hint="Use your work email" error="Email is required" /><FormField label="Backup email" /></>);
  const primary = screen.getByLabelText('Email');
  expect(primary.id).not.toBe(screen.getByLabelText('Backup email').id);
  expect(primary).toHaveAttribute('aria-invalid', 'true');
  expect(primary).toHaveAccessibleDescription('Use your work email Email is required');
});

test('a busy button blocks duplicate actions and defaults to a non-submit button', () => {
  const click = vi.fn();
  render(<Button busy onClick={click}>Save</Button>);
  const button = screen.getByRole('button', {name:'Save'});
  fireEvent.click(button);
  expect(click).not.toHaveBeenCalled();
  expect(button).toHaveAttribute('type', 'button');
  expect(button).toHaveAttribute('aria-busy', 'true');
});
