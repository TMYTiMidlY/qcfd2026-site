import { Plane, TrainFront, Train, Car, CloudSun } from 'lucide-react'
import { traffic, weather, type TrafficInfo } from '@/data/traffic'

const iconMap: Record<TrafficInfo['icon'], typeof Plane> = {
  plane: Plane,
  'train-front': TrainFront,
  train: Train,
  car: Car,
}

export function Traffic() {
  return (
    <section id="traffic" className="section-pad">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">交通指南</span>
          <h2 className="mt-3 text-3xl font-bold text-fg md:text-4xl">
            从机场 / 高铁站抵达会场
          </h2>
          <p className="mt-3 text-fg-soft">
            合肥交通便捷，机场、高铁站、市区均可方便地抵达翡翠湖迎宾馆。
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {traffic.map((t) => {
            const Icon = iconMap[t.icon]
            return (
              <div key={t.origin} className="card-surface p-6">
                <div className="flex items-start gap-4">
                  <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-fg">
                      {t.origin}
                    </h3>
                    <p className="mt-1 text-xs text-fg-muted">
                      {t.distance} · {t.duration}
                    </p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-fg-soft">
                  {t.notes.map((n, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary/70" />
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl border border-primary/20 bg-primary/[0.06] p-5 sm:flex-row sm:items-center">
          <CloudSun className="size-6 shrink-0 text-primary" />
          <p className="text-sm text-fg-soft">
            <span className="font-medium text-fg">{weather.city} · {weather.period}：</span>
            {weather.summary}
          </p>
        </div>
      </div>
    </section>
  )
}
