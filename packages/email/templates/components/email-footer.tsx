import { Link, Section, Text } from '@react-email/components';

// import { siteConfig } from ''

type EmailFooterProps = {
  /**
   * Style variant for the email footer
   * - "simple": Basic copyright text (for waitlist emails)
   * - "detailed": Copyright + author link (for marketing emails)
   */
  variant?: "simple" | "detailed"
};

export function EmailFooter({ variant = 'detailed' }: EmailFooterProps) {
  const currentYear = new Date().getFullYear();

  if (variant === 'simple') {
    return (
      <Section className="mt-[32px] border-t border-gray-200 pt-[20px]">
        <Text className="m-0 text-center text-[12px] text-gray-500">
          © {currentYear} {siteConfig.name}. All rights reserved.
        </Text>
      </Section>
    )
  }
}