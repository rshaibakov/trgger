import { test, expect } from 'vitest'
import { render } from '@testing-library/vue'
import App from './App.vue'

test('component displayed', async () => {
  const { getByTestId } = render(App)

  expect(getByTestId('app')).toBeInTheDocument()
})
