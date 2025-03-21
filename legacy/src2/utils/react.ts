import React, { 
  useState, 
  useEffect, 
  useRef, 
  ReactNode, 
  ChangeEvent, 
  KeyboardEvent,
  FormEvent,
  MouseEvent,
  Dispatch,
  SetStateAction
} from 'react';

export type { 
  ReactNode,
  ChangeEvent,
  KeyboardEvent,
  FormEvent,
  MouseEvent,
  Dispatch,
  SetStateAction
};

export { 
  React as default,
  useState,
  useEffect,
  useRef
};

// Add type declarations for common event handlers
export type InputChangeEvent = ChangeEvent<HTMLInputElement>;
export type TextAreaChangeEvent = ChangeEvent<HTMLTextAreaElement>;
export type ButtonClickEvent = MouseEvent<HTMLButtonElement>;
export type SetState<T> = Dispatch<SetStateAction<T>>;

// Add type declarations for common component props
export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

export interface InputProps extends BaseProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
} 