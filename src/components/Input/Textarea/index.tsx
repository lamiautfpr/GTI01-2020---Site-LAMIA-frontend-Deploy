import React, {
  useRef,
  useEffect,
  TextareaHTMLAttributes,
  useState,
  useCallback,
} from 'react';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { MdInfo } from 'react-icons/md';
import { Container, Error } from './styles';

export interface ITextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  isFormGroup?: boolean;
  width?: number;
  isHidden?: boolean;
  activeColor?: string;
}

const Textarea: React.FC<ITextareaProps> = ({
  isFormGroup = false,
  width,
  name,
  icon: Icon,
  isHidden = false,
  activeColor,
  children,
  ...rest
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  // const [isFilled, setIsFilled] = useState(false);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    // setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      width={width}
      isFormGroup={isFormGroup}
      isErrored={!!error}
      isFocused={isFocused}
      isHidden={isHidden}
      activeColor={activeColor}
    >
      {Icon && <Icon size={24} />}
      {children}
      <textarea
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <MdInfo size={24} color="#ac3030" />
        </Error>
      )}
    </Container>
  );
};

export default Textarea;
