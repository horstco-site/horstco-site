export type ProjectCategory = 'Residencial' | 'Comercial' | 'Investidor' | 'Interiores'

export interface Project {
  slug: string
  title: string
  subtitle: string
  category: ProjectCategory
  year: string
  location: string
  area: string
  description: string
  longDescription: string
  coverImage: string
  images: string[]
  featured: boolean
  tags: string[]
}

export const projects: Project[] = [
  {
    slug: 'penthouse-fg',
    title: 'Penthouse FG',
    subtitle: 'Exclusividade nos detalhes',
    category: 'Residencial',
    year: '2024',
    location: 'São Paulo, SP',
    area: '420 m²',
    description: 'Um penthouse que redefine o conceito de morar bem em São Paulo, com vistas panorâmicas e acabamentos de altíssimo padrão.',
    longDescription: 'O Penthouse FG nasceu do desejo de criar um lar que fosse, ao mesmo tempo, um refúgio e uma extensão da personalidade sofisticada de seus moradores. Com 420 m² distribuídos em dois andares, o projeto integra ambientes amplos e fluidos, onde cada elemento foi cuidadosamente selecionado para criar uma atmosfera de exclusividade atemporal.\n\nA paleta de materiais combina mármore travertino, madeiras nobres e metais com acabamento escovado. As soluções de iluminação foram projetadas em parceria com especialistas, criando camadas de luz que se adaptam a cada momento do dia.',
    coverImage: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1400&q=85&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1400&q=85&fit=crop',
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1400&q=85&fit=crop',
      'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1400&q=85&fit=crop',
      'https://images.unsplash.com/photo-1615873968403-89e068629265?w=1400&q=85&fit=crop',
    ],
    featured: true,
    tags: ['Penthouse', 'Alto padrão', 'Interiores', 'São Paulo'],
  },
  {
    slug: 'apto-pavao',
    title: 'Apto Pavão',
    subtitle: 'Minimalismo com alma',
    category: 'Interiores',
    year: '2024',
    location: 'São Paulo, SP',
    area: '180 m²',
    description: 'Apartamento no Itaim Bibi com projeto de interiores que combina minimalismo rigoroso e aconchego residencial.',
    longDescription: 'O Apto Pavão demonstra que o minimalismo não precisa ser frio. Com 180 m², o projeto foi desenvolvido para um casal jovem e cosmopolita que buscava um espaço que refletisse sua visão de mundo — limpo, intencional e cheio de personalidade.\n\nAs paredes em stucco veneziano criam texturas sutis que dialogam com a mobília de design assinado. A escolha do linho belga para estofados e cortinas adiciona uma camada sensorial que transforma o cotidiano em experiência.',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=85&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=85&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=85&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=85&fit=crop',
    ],
    featured: true,
    tags: ['Apartamento', 'Interiores', 'Minimalismo'],
  },
  {
    slug: 'apto-vr',
    title: 'Apto VR',
    subtitle: 'Natureza e sofisticação',
    category: 'Residencial',
    year: '2023',
    location: 'Vila Nova Conceição, SP',
    area: '240 m²',
    description: 'Residência que incorpora elementos naturais com sofisticação contemporânea em um dos bairros mais valorizados de São Paulo.',
    longDescription: 'O Apto VR traduz a vontade de seus moradores de viver em harmonia com a natureza sem abrir mão do refinamento urbano. As escolhas materiais privilegiam madeiras certificadas, pedras naturais e vegetação integrada à arquitetura.\n\nO projeto de paisagismo interno foi desenvolvido em conjunto com o escritório de interiores, criando um fluxo orgânico entre ambientes internos e a varanda que se abre para a cidade.',
    coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=85&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=85&fit=crop',
      'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=1400&q=85&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=85&fit=crop',
    ],
    featured: true,
    tags: ['Apartamento', 'Natureza', 'Contemporâneo'],
  },
  {
    slug: 'decorato-concept',
    title: 'Decorato Concept',
    subtitle: 'Identidade comercial com propósito',
    category: 'Comercial',
    year: '2023',
    location: 'Jardins, SP',
    area: '320 m²',
    description: 'Espaço comercial conceito que traduz em arquitetura os valores da marca — sofisticação, curadoria e experiência.',
    longDescription: 'O Decorato Concept é um projeto que vai além da arquitetura comercial convencional. O briefing pediu um espaço que fosse, em si mesmo, um manifesto da marca — um lugar onde cada visitante sentisse imediatamente o que a empresa representa.\n\nA solução criativa uniu materialidade premium com flexibilidade de uso, permitindo que o espaço se reinvente de acordo com as coleções e eventos sem perder sua identidade.',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=85&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=85&fit=crop',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1400&q=85&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&q=85&fit=crop',
    ],
    featured: false,
    tags: ['Comercial', 'Concept Store', 'Branding espacial'],
  },
  {
    slug: 'apto-antonio',
    title: 'Apto Antonio',
    subtitle: 'Clássico contemporâneo',
    category: 'Interiores',
    year: '2023',
    location: 'Moema, SP',
    area: '195 m²',
    description: 'Projeto de interiores que harmoniza referências clássicas com uma linguagem contemporânea para um executivo colecionador de arte.',
    longDescription: 'O Apto Antonio foi concebido para um morador com visão estética apurada e uma coleção de arte que precisava ser contextualizada com inteligência. O desafio era criar um ambiente que servisse de cenário para as obras sem competir com elas.\n\nA resposta veio em neutros profundos — verdes militares, terracota e off-white — que criam uma atmosfera de galeria doméstica. Os acabamentos artesanais e a mobília de design italiano completam a narrativa.',
    coverImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1400&q=85&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1400&q=85&fit=crop',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=1400&q=85&fit=crop',
      'https://images.unsplash.com/photo-1583845112203-29329902332e?w=1400&q=85&fit=crop',
    ],
    featured: false,
    tags: ['Apartamento', 'Arte', 'Clássico contemporâneo'],
  },
  {
    slug: 'alm-home',
    title: 'Alm Home',
    subtitle: 'Investimento com estética',
    category: 'Investidor',
    year: '2024',
    location: 'Pinheiros, SP',
    area: '85 m²',
    description: 'Projeto desenvolvido para investidor com foco em maximizar o valor do imóvel e atratividade para locação de alto padrão.',
    longDescription: 'O Alm Home demonstra que projetos de investimento podem — e devem — ter a mesma qualidade estética dos projetos residenciais tradicionais. Desenvolvido para um portfólio de locação premium, o apartamento foi projetado para causar impacto imediato e garantir alta taxa de ocupação.\n\nA estratégia de design priorizou materiais duráveis, layout funcional e uma identidade visual forte que se destaca nas plataformas de locação. O resultado foi um imóvel que alcançou valorização expressiva e taxa de ocupação acima da média do mercado.',
    coverImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1400&q=85&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1400&q=85&fit=crop',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1400&q=85&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1400&q=85&fit=crop',
    ],
    featured: false,
    tags: ['Investidor', 'Locação', 'Alto padrão'],
  },
]

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((p) => p.slug === slug)
}

export const getFeaturedProjects = (): Project[] => {
  return projects.filter((p) => p.featured)
}

export const getProjectsByCategory = (category: ProjectCategory): Project[] => {
  return projects.filter((p) => p.category === category)
}
