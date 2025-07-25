import React, { forwardRef, useEffect } from 'react'
import { TextInputProps, Animated, TextInput } from 'react-native'
import styled, { DefaultTheme } from 'styled-components/native'
import { FontAwesome } from '@expo/vector-icons'
import { ErrorBox } from '../alert'

export type Props = {
  label?: string
  type?: 'password' | 'text'
  error?: string
  color?: 'secondary'
  hideError?: boolean
} & TextInputProps

type PropsWithTheme = Props & { theme: DefaultTheme }

export const TextField = forwardRef<TextInput, Props>((props, ref) => {
  const { type = 'text', label, error, value, hideError, ...rest } = props
  const [isSecureText, setShowSecureText] = React.useState(type === 'password')
  const [inputValue, setInputValue] = React.useState<string | undefined>(value)
  const fadeAnim = React.useRef(new Animated.Value(0)).current

  const handleChangeText = (text: string) => {
    setInputValue(text)
    if (rest.onChangeText) {
      rest.onChangeText(text)
    }
  }

  useEffect(() => {
    setInputValue(value)
  }, [value])

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: inputValue ? 1 : 0,
      duration: 300,
      useNativeDriver: true
    }).start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])

  return (
    <>
      <Container>
        <AnimatedLabel {...rest} style={{ opacity: fadeAnim }}>
          {label}
        </AnimatedLabel>
        <Content {...rest}>
          <TextFieldStyled
            ref={ref}
            {...rest}
            value={inputValue}
            secureTextEntry={isSecureText}
            onChangeText={handleChangeText}
          />
          {type === 'password' ? (
            <ToggleIcon>
              <FontAwesome
                size={28}
                name={isSecureText ? 'eye-slash' : 'eye'}
                onPress={() => setShowSecureText((prev) => !prev)}
              />
            </ToggleIcon>
          ) : null}
        </Content>
      </Container>
      {hideError ? null : <ErrorBox>{error}</ErrorBox>}
    </>
  )
})

TextField.displayName = 'TextField'

const Container = styled.View`
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding-bottom: 2px;
`

const Content = styled.View<PropsWithTheme>`
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${(p) => p.theme.textinputs.border};
  padding: 0 8px;
  color: ${(p) => p.theme.colors.black};
  background-color: ${(p) => (p.editable === false ? '#f0f0f0' : p.theme.textinputs.background)};
`

const TextFieldStyled = styled.TextInput.attrs((props: PropsWithTheme) => ({
  placeholderTextColor: props.theme.textinputs.primary.placeholder.color || props.theme.textinputs.primary.placeholder.color
}))`
  flex: 1;
  height: 40px;
  width: 100%;
  font-weight: 500;
  line-height: 20px;
  font-size: 18px;
  placeholder: ${(p) => p.theme.textinputs.label};
  border-style: solid;
`

const ToggleIcon = styled.TouchableOpacity`
  color: ${(p) => p.theme.colors.black};
  padding: 2px;
`

const AnimatedLabel = styled(Animated.Text)<PropsWithTheme>`
  color: ${(p) => (p.color ? p.theme.colors.gray : p.theme.colors.gray)};
  font-size: 14px;
  letter-spacing: 0.5px;
  font-weight: 500;
`
