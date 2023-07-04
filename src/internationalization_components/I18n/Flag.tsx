
import React from 'react'

// Componente bem simples que recebe uma imagem 
// e se está selecionada ou não (apenas para efeitos visuais)

const Flag = ({ image, isSelected, ...props } : any) => (
  <img alt="flag" src={image} className={isSelected ? 'flag selected' : 'flag'} {...props} />
)

export default Flag