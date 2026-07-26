export interface CalculatorSocialCardCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  features: string;
  brand: string;
}

interface CalculatorSocialCardProps {
  copy: CalculatorSocialCardCopy;
}

export default function CalculatorSocialCard({ copy }: CalculatorSocialCardProps) {
  return (
    <div
      style={{
        alignItems: 'flex-start',
        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 55%, #0f766e 100%)',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        padding: '64px 72px',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(167, 243, 208, 0.5)',
            borderRadius: 999,
            color: '#d1fae5',
            display: 'flex',
            fontSize: 24,
            fontWeight: 600,
            padding: '12px 24px',
          }}
        >
          {copy.eyebrow}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 66,
            fontWeight: 800,
            letterSpacing: '-2px',
            lineHeight: 1.08,
            marginTop: 34,
            maxWidth: 980,
          }}
        >
          {copy.title}
        </div>
        <div
          style={{
            color: '#a7f3d0',
            display: 'flex',
            fontSize: 32,
            fontWeight: 700,
            marginTop: 24,
          }}
        >
          {copy.subtitle}
        </div>
      </div>

      <div
        style={{
          alignItems: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: 26,
          width: '100%',
        }}
      >
        <div style={{ color: '#d1fae5', display: 'flex', fontSize: 23 }}>{copy.features}</div>
        <div style={{ display: 'flex', fontSize: 25, fontWeight: 800 }}>{copy.brand}</div>
      </div>
    </div>
  );
}
