import React, { useState, InputHTMLAttributes } from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

import styled, { css } from 'styled-components'
import { space, layout, border, color } from 'styled-system'

import { Button } from '../Button'
import { Flex } from '../Flex'
import { Box } from '../Box'

import { InputErrorMessage } from '../InputErrorMessage'

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  name?: string
  inputRef?: any
  errorForm?: boolean
  type?: string
  errorMessage?: string
  value?: string
  sufix?: any
  prefix?: any
  placeholder?: string
  containerProps?: any
  boxProps?: any

  backgroundColor?: any
  border?: any
  width?: any
  maxWidth?: any
  disabled?: boolean
  nativeAutoComplete?: 'on' | 'disabled'
}

export const InputStyled = styled.input.attrs({
  'data-testid': 'input'
}) <Props>`
  &::placeholder {
    color: ${({ theme }) => theme.colors.grey};
    font-size: ${({ theme }) => theme.fontSizes.medium};
  }

  padding: 10px 12px;
  font-family: inherit;
  border: 1px solid ${({ theme }) => theme.colors.mediumGrey};
  border-radius: 4px;

  ${space}
  ${layout}
  ${color}
  ${border}

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  ${({ theme, errorForm }) =>
    errorForm &&
    css`
      border-color: ${theme.colors.error};
    `};
`

export interface PropsContainerSufix {
  inputSelected?: boolean
  errorForm?: boolean
  onClick?: () => void
  onBlur?: () => void
  disabled?: boolean
}

export const ContainerSufix = styled(Box) <PropsContainerSufix>`
  display: flex;
  align-items: center;

  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.mediumGrey};
  border-radius: 4px;
  background: ${({ theme, disabled }) =>
    disabled ? theme.colors.lightGrey : theme.colors.white};

  ${({ inputSelected, disabled }) =>
    inputSelected &&
    !disabled &&
    css`
      border-color: ${({ theme }) => theme.colors.primary};

      svg {
        color: ${({ theme }) => theme.colors.primary};
      }
    `}

  ${({ theme, errorForm }) =>
    errorForm &&
    css`
      border-color: ${theme.colors.error};
    `};
  ${border}
`

export const InputSufixed = styled.input<Props>`
  ${layout}
  ${color}

  border: none;
`

export const InputPrefixed = styled.input<Props>`
  ${layout}
  ${color}
  
  border: none;
  margin-left: 16px;
`

export const InputNeutral: React.FC<Props> = ({
  name,
  inputRef,
  errorForm,
  errorMessage,
  type = 'text',
  sufix,
  prefix,
  value,
  placeholder,
  containerProps,
  nativeAutoComplete,
  disabled,
  ...props
}) => {
  const [inputSelected, setInputSelected] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)

  const { backgroundColor, border, width, maxWidth, boxProps } = props
  const boxStyled = {
    backgroundColor,
    border,
    width,
    maxWidth,
    ...boxProps
  }

  if (sufix) {
    return (
      <Flex {...containerProps} flexDirection='column'>
        <ContainerSufix
          {...boxStyled}
          inputSelected={inputSelected}
          onClick={() => setInputSelected(true)}
          onBlur={() => setInputSelected(false)}
          disabled={disabled}
        >
          <InputSufixed
            name={name}
            ref={inputRef}
            placeholder={placeholder}
            type={type}
            value={value}
            errorForm={errorForm}
            errorMessage={errorMessage}
            autoComplete={nativeAutoComplete}
            disabled={disabled}
            {...props}
          />
          {sufix}
        </ContainerSufix>

        {errorForm && <InputErrorMessage errorMessage={errorMessage} />}
      </Flex>
    )
  }

  if (prefix) {
    return (
      <Flex {...containerProps}>
        <ContainerSufix
          {...boxStyled}
          inputSelected={inputSelected}
          onClick={() => setInputSelected(true)}
          onBlur={() => setInputSelected(false)}
        >
          {prefix}
          <InputPrefixed
            name={name}
            ref={inputRef}
            placeholder={placeholder}
            type={type}
            value={value}
            errorForm={errorForm}
            errorMessage={errorMessage}
            autoComplete={nativeAutoComplete}
            {...props}
          />
        </ContainerSufix>

        {errorForm && <InputErrorMessage errorMessage={errorMessage} />}
      </Flex>
    )
  }

  if (type === 'password') {
    return (
      <Flex {...containerProps} flexDirection='column'>
        <ContainerSufix
          {...boxStyled}
          inputSelected={inputSelected}
          onClick={() => setInputSelected(true)}
          onBlur={() => setInputSelected(false)}
        >
          <InputSufixed
            name={name}
            ref={inputRef}
            placeholder={placeholder}
            type={passwordVisible ? 'text' : 'password'}
            value={value}
            errorForm={errorForm}
            errorMessage={errorMessage}
            autoComplete={nativeAutoComplete}
            {...props}
          />
          <Button
            palette='primary'
            mr={5}
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? (
              <MdVisibilityOff size={22} />
            ) : (
              <MdVisibility size={22} />
            )}
          </Button>
        </ContainerSufix>

        {errorForm && <InputErrorMessage errorMessage={errorMessage} />}
      </Flex>
    )
  }

  return (
    <Flex {...containerProps} flexDirection='column'>
      <InputStyled
        name={name}
        ref={inputRef}
        placeholder={placeholder}
        type={type}
        sufix={sufix}
        value={value}
        errorForm={errorForm}
        errorMessage={errorMessage}
        autoComplete={nativeAutoComplete}
        {...props}
        data-testid='input'
        nativeAutoComplete={nativeAutoComplete}
        disabled={disabled}
      />

      {errorForm && <InputErrorMessage errorMessage={errorMessage} />}
    </Flex>
  )
}