import { Header } from "../_components/header"

export default function ProductSelectorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="product-selector">
      {children}
    </section>
  )
}