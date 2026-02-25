/* eslint-disable @eslint-react/no-array-index-key */
'use client';

import { useEffect, useState } from 'react';
import { PP_MORI } from '@assets/fonts';
import Button from '@design/Button/Button';
import Dot from '@design/Dot/Dot';
import Logo from '@design/Logo/Logo';
import MotionDiv from '@design/MotionDiv/MotionDiv';
import { membersData } from '@libs/data/members';
import cn from '@libs/utils/cn';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-nprogress-bar';
import React from 'react';
import type { RecentWorkCardProps } from './RecentWorkCard';
import RecentWorkCard from './RecentWorkCard';
import { supabase } from '@/libs/supabase';

const LandingRecentWorks = () => {
  const t = useTranslations('recentWorks');
  const router = useRouter();
  const [works, setWorks] = useState<RecentWorkCardProps[]>([]);

  useEffect(() => {
    supabase
      .from('works')
      .select('*')
      .order('sort_order', { ascending: true })
      .limit(3)
      .then(({ data }) => {
        if (!data) return;
        setWorks(data.map(w => ({
          multiple: w.multiple,
          bg: w.bg,
          data: {
            title: w.title,
            client: w.client,
            date: w.date,
            tools: w.tools,
            images: w.images,
            designers: membersData.filter(m => w.designers.includes(m.id)),
          },
        })));
      });
  }, []);

  return (
    <div className="mt-[93px] flex flex-col items-center gap-[18px] md:mt-[145px]"
         id="recent-works">
      <Logo />
      <MotionDiv className="flex flex-col items-center text-center text-[29px]
                           font-medium !leading-[38px] sm:text-[33px]">
        <h3>{t('title')}</h3>
      </MotionDiv>
      <MotionDiv className={cn(
        'max-w-[90%] text-center text-[15px] !leading-[24px] text-black/40 sm:max-w-[494px]',
        PP_MORI.className,
      )}>
        {t('description')}
      </MotionDiv>
      <div className="mt-9 flex w-full max-w-[95%] flex-col gap-4
                      md:gap-[45px] lg:max-w-[947px]">
        {works.map((data, index) => (
          <RecentWorkCard key={`Recent_Card_Landing${index}`} {...data} />
        ))}
      </div>
      <Button primary className="flex items-center text-sm"
              containerClass="mt-5 sm:mt-10"
              onClick={() => router.push('/recent')}>
        <Dot size={3} color="#41E9D4" />
        <span className="pl-2">{t('seeMoreWorks')}</span>
      </Button>
    </div>
  );
};

export default LandingRecentWorks;
