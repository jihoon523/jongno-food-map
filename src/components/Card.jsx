import { CATEGORIES, CATEGORY_COLOR } from '../lib/restaurants'
import './Card.css'

const categoryLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label ?? id

/**
 * 하단(모바일) / 우측(PC) 패널.
 * selected 가 single 이면 식당 카드, building 이면 그 건물의 식당 목록을 보여준다.
 */
export default function Card({ selected, onSelectRestaurant, onBack, onClose }) {
  if (!selected) return null

  return (
    <aside className="card" role="dialog">
      <div className="card__handle" />
      {selected.kind === 'building' ? (
        <BuildingList group={selected} onSelect={onSelectRestaurant} onClose={onClose} />
      ) : (
        <RestaurantCard
          restaurant={selected.restaurant}
          onBack={selected.from ? onBack : null}
          onClose={onClose}
        />
      )}
    </aside>
  )
}

function Header({ title, subtitle, onBack, onClose }) {
  return (
    <header className="card__header">
      {onBack && (
        <button type="button" className="card__icon" onClick={onBack} aria-label="뒤로">
          ‹
        </button>
      )}
      <div className="card__titles">
        <h2 className="card__title">{title}</h2>
        {subtitle && <p className="card__subtitle">{subtitle}</p>}
      </div>
      <button type="button" className="card__icon" onClick={onClose} aria-label="닫기">
        ×
      </button>
    </header>
  )
}

function RestaurantCard({ restaurant: r, onBack, onClose }) {
  const where = [r.building, r.floor].filter(Boolean).join(' · ')
  return (
    <>
      <Header title={r.name} subtitle={where} onBack={onBack} onClose={onClose} />
      <div className="card__chips">
        <span className="chip chip--category" style={{ '--chip': CATEGORY_COLOR[r.category] }}>
          {categoryLabel(r.category)}
        </span>
        <span className="chip">{r.price}</span>
        <span className="chip">★ {r.rating.toFixed(1)}</span>
      </div>
      <dl className="card__facts">
        <dt>추천 메뉴</dt>
        <dd>{r.menu}</dd>
        <dt>한줄평</dt>
        <dd>{r.review}</dd>
      </dl>
    </>
  )
}

function BuildingList({ group, onSelect, onClose }) {
  return (
    <>
      <Header
        title={group.name}
        subtitle={`식당 ${group.restaurants.length}곳`}
        onClose={onClose}
      />
      <ul className="list">
        {group.restaurants.map((r) => (
          <li key={r.id}>
            <button type="button" className="list__item" onClick={() => onSelect(r)}>
              <span className="list__floor">{r.floor}</span>
              <span className="list__name">{r.name}</span>
              <span className="list__meta">
                {categoryLabel(r.category)} · {r.price}
              </span>
              <span className="list__dot" style={{ background: CATEGORY_COLOR[r.category] }} />
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
