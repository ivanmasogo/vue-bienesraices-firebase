
export const propertyPrice = (precio) =>
  Number(precio).toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
  })