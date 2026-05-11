import { Mail, Phone, Globe, Receipt } from 'lucide-react'
import { conference } from '@/data/conference'

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-bg-alt pt-16 pb-10">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <img
              src="/generated/qcfd-logo.png"
              alt="QCFD"
              width={56}
              height={56}
              decoding="async"
              className="size-14 rounded-2xl object-cover shadow-lg shadow-primary/25"
            />
            <h3 className="mt-4 text-lg font-semibold text-fg">
              {conference.name}
            </h3>
            <p className="mt-3 max-w-md text-sm text-fg-soft">
              {conference.tagline}
            </p>
            <div className="mt-5 space-y-1.5 text-xs text-fg-muted">
              <p>
                主办：<span className="text-fg-soft">{conference.organizer}</span>
              </p>
              <p>
                承办：<span className="text-fg-soft">{conference.host}</span>
              </p>
              <p>
                协办：
                <span className="text-fg-soft">
                  {conference.coOrganizers.join('、')}
                </span>
              </p>
              <p>
                会议主席：<span className="text-fg-soft">{conference.chair}</span>
                {' · '}
                组委会：
                <span className="text-fg-soft">
                  {conference.committee.join('、')}
                </span>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-fg">
              会议联系人
            </h4>
            <ul className="mt-4 space-y-4 text-sm text-fg-soft">
              {conference.contacts.map((c) => (
                <li key={c.email}>
                  <p className="font-medium text-fg">{c.name}</p>
                  <a
                    href={`tel:${c.phone}`}
                    className="mt-1 inline-flex items-center gap-2 text-xs text-fg-muted hover:text-primary"
                  >
                    <Phone className="size-3" />
                    {c.phone}
                  </a>
                  <br />
                  <a
                    href={`mailto:${c.email}`}
                    className="mt-1 inline-flex items-center gap-2 text-xs text-fg-muted hover:text-primary"
                  >
                    <Mail className="size-3" />
                    {c.email}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-fg">
              注册与发票
            </h4>
            <div className="mt-4 space-y-3 text-sm text-fg-soft">
              <p className="inline-flex items-center gap-2">
                <Receipt className="size-4 text-primary" />
                注册费 {conference.fee}
              </p>
              <p className="text-xs text-fg-muted">{conference.feeMember}</p>
              <p className="text-xs text-fg-muted">
                由中国力学学会提供 “会议注册费” 数电发票。
                会议召开 15 天前可申请退款。
              </p>
              <a
                href={conference.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs text-primary hover:underline"
              >
                <Globe className="size-3" />
                {conference.websiteUrl}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-black/5 pt-6 text-xs text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {conference.name} · 保留所有权利
          </p>
          <p>站点由会议组委会维护，内容持续更新</p>
        </div>
      </div>
    </footer>
  )
}
