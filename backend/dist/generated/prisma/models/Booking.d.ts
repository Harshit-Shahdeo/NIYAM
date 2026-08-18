import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type BookingModel = runtime.Types.Result.DefaultSelection<Prisma.$BookingPayload>;
export type AggregateBooking = {
    _count: BookingCountAggregateOutputType | null;
    _min: BookingMinAggregateOutputType | null;
    _max: BookingMaxAggregateOutputType | null;
};
export type BookingMinAggregateOutputType = {
    id: string | null;
    institutionId: string | null;
    resourceId: string | null;
    userId: string | null;
    requestId: string | null;
    date: Date | null;
    startTime: Date | null;
    endTime: Date | null;
    purpose: string | null;
    status: $Enums.BookingStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BookingMaxAggregateOutputType = {
    id: string | null;
    institutionId: string | null;
    resourceId: string | null;
    userId: string | null;
    requestId: string | null;
    date: Date | null;
    startTime: Date | null;
    endTime: Date | null;
    purpose: string | null;
    status: $Enums.BookingStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BookingCountAggregateOutputType = {
    id: number;
    institutionId: number;
    resourceId: number;
    userId: number;
    requestId: number;
    date: number;
    startTime: number;
    endTime: number;
    purpose: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type BookingMinAggregateInputType = {
    id?: true;
    institutionId?: true;
    resourceId?: true;
    userId?: true;
    requestId?: true;
    date?: true;
    startTime?: true;
    endTime?: true;
    purpose?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BookingMaxAggregateInputType = {
    id?: true;
    institutionId?: true;
    resourceId?: true;
    userId?: true;
    requestId?: true;
    date?: true;
    startTime?: true;
    endTime?: true;
    purpose?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BookingCountAggregateInputType = {
    id?: true;
    institutionId?: true;
    resourceId?: true;
    userId?: true;
    requestId?: true;
    date?: true;
    startTime?: true;
    endTime?: true;
    purpose?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type BookingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithRelationInput | Prisma.BookingOrderByWithRelationInput[];
    cursor?: Prisma.BookingWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BookingCountAggregateInputType;
    _min?: BookingMinAggregateInputType;
    _max?: BookingMaxAggregateInputType;
};
export type GetBookingAggregateType<T extends BookingAggregateArgs> = {
    [P in keyof T & keyof AggregateBooking]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBooking[P]> : Prisma.GetScalarType<T[P], AggregateBooking[P]>;
};
export type BookingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithAggregationInput | Prisma.BookingOrderByWithAggregationInput[];
    by: Prisma.BookingScalarFieldEnum[] | Prisma.BookingScalarFieldEnum;
    having?: Prisma.BookingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BookingCountAggregateInputType | true;
    _min?: BookingMinAggregateInputType;
    _max?: BookingMaxAggregateInputType;
};
export type BookingGroupByOutputType = {
    id: string;
    institutionId: string;
    resourceId: string;
    userId: string;
    requestId: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    purpose: string | null;
    status: $Enums.BookingStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: BookingCountAggregateOutputType | null;
    _min: BookingMinAggregateOutputType | null;
    _max: BookingMaxAggregateOutputType | null;
};
type GetBookingGroupByPayload<T extends BookingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BookingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BookingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BookingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BookingGroupByOutputType[P]>;
}>>;
export type BookingWhereInput = {
    AND?: Prisma.BookingWhereInput | Prisma.BookingWhereInput[];
    OR?: Prisma.BookingWhereInput[];
    NOT?: Prisma.BookingWhereInput | Prisma.BookingWhereInput[];
    id?: Prisma.StringFilter<"Booking"> | string;
    institutionId?: Prisma.StringFilter<"Booking"> | string;
    resourceId?: Prisma.StringFilter<"Booking"> | string;
    userId?: Prisma.StringFilter<"Booking"> | string;
    requestId?: Prisma.StringFilter<"Booking"> | string;
    date?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    startTime?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    endTime?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    purpose?: Prisma.StringNullableFilter<"Booking"> | string | null;
    status?: Prisma.EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    institution?: Prisma.XOR<Prisma.InstitutionScalarRelationFilter, Prisma.InstitutionWhereInput>;
    resource?: Prisma.XOR<Prisma.ResourceScalarRelationFilter, Prisma.ResourceWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    request?: Prisma.XOR<Prisma.ServiceRequestScalarRelationFilter, Prisma.ServiceRequestWhereInput>;
};
export type BookingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    resourceId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    purpose?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    institution?: Prisma.InstitutionOrderByWithRelationInput;
    resource?: Prisma.ResourceOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
    request?: Prisma.ServiceRequestOrderByWithRelationInput;
};
export type BookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    requestId?: string;
    AND?: Prisma.BookingWhereInput | Prisma.BookingWhereInput[];
    OR?: Prisma.BookingWhereInput[];
    NOT?: Prisma.BookingWhereInput | Prisma.BookingWhereInput[];
    institutionId?: Prisma.StringFilter<"Booking"> | string;
    resourceId?: Prisma.StringFilter<"Booking"> | string;
    userId?: Prisma.StringFilter<"Booking"> | string;
    date?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    startTime?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    endTime?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    purpose?: Prisma.StringNullableFilter<"Booking"> | string | null;
    status?: Prisma.EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    institution?: Prisma.XOR<Prisma.InstitutionScalarRelationFilter, Prisma.InstitutionWhereInput>;
    resource?: Prisma.XOR<Prisma.ResourceScalarRelationFilter, Prisma.ResourceWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    request?: Prisma.XOR<Prisma.ServiceRequestScalarRelationFilter, Prisma.ServiceRequestWhereInput>;
}, "id" | "requestId">;
export type BookingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    resourceId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    purpose?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.BookingCountOrderByAggregateInput;
    _max?: Prisma.BookingMaxOrderByAggregateInput;
    _min?: Prisma.BookingMinOrderByAggregateInput;
};
export type BookingScalarWhereWithAggregatesInput = {
    AND?: Prisma.BookingScalarWhereWithAggregatesInput | Prisma.BookingScalarWhereWithAggregatesInput[];
    OR?: Prisma.BookingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BookingScalarWhereWithAggregatesInput | Prisma.BookingScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Booking"> | string;
    institutionId?: Prisma.StringWithAggregatesFilter<"Booking"> | string;
    resourceId?: Prisma.StringWithAggregatesFilter<"Booking"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Booking"> | string;
    requestId?: Prisma.StringWithAggregatesFilter<"Booking"> | string;
    date?: Prisma.DateTimeWithAggregatesFilter<"Booking"> | Date | string;
    startTime?: Prisma.DateTimeWithAggregatesFilter<"Booking"> | Date | string;
    endTime?: Prisma.DateTimeWithAggregatesFilter<"Booking"> | Date | string;
    purpose?: Prisma.StringNullableWithAggregatesFilter<"Booking"> | string | null;
    status?: Prisma.EnumBookingStatusWithAggregatesFilter<"Booking"> | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Booking"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Booking"> | Date | string;
};
export type BookingCreateInput = {
    id?: string;
    date: Date | string;
    startTime: Date | string;
    endTime: Date | string;
    purpose?: string | null;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutBookingsInput;
    resource: Prisma.ResourceCreateNestedOneWithoutBookingsInput;
    user: Prisma.UserCreateNestedOneWithoutBookingsInput;
    request: Prisma.ServiceRequestCreateNestedOneWithoutBookingInput;
};
export type BookingUncheckedCreateInput = {
    id?: string;
    institutionId: string;
    resourceId: string;
    userId: string;
    requestId: string;
    date: Date | string;
    startTime: Date | string;
    endTime: Date | string;
    purpose?: string | null;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BookingUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutBookingsNestedInput;
    resource?: Prisma.ResourceUpdateOneRequiredWithoutBookingsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutBookingsNestedInput;
    request?: Prisma.ServiceRequestUpdateOneRequiredWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BookingCreateManyInput = {
    id?: string;
    institutionId: string;
    resourceId: string;
    userId: string;
    requestId: string;
    date: Date | string;
    startTime: Date | string;
    endTime: Date | string;
    purpose?: string | null;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BookingUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BookingUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BookingListRelationFilter = {
    every?: Prisma.BookingWhereInput;
    some?: Prisma.BookingWhereInput;
    none?: Prisma.BookingWhereInput;
};
export type BookingOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BookingNullableScalarRelationFilter = {
    is?: Prisma.BookingWhereInput | null;
    isNot?: Prisma.BookingWhereInput | null;
};
export type BookingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    resourceId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BookingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    resourceId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BookingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    resourceId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BookingCreateNestedManyWithoutInstitutionInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutInstitutionInput, Prisma.BookingUncheckedCreateWithoutInstitutionInput> | Prisma.BookingCreateWithoutInstitutionInput[] | Prisma.BookingUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutInstitutionInput | Prisma.BookingCreateOrConnectWithoutInstitutionInput[];
    createMany?: Prisma.BookingCreateManyInstitutionInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUncheckedCreateNestedManyWithoutInstitutionInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutInstitutionInput, Prisma.BookingUncheckedCreateWithoutInstitutionInput> | Prisma.BookingCreateWithoutInstitutionInput[] | Prisma.BookingUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutInstitutionInput | Prisma.BookingCreateOrConnectWithoutInstitutionInput[];
    createMany?: Prisma.BookingCreateManyInstitutionInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUpdateManyWithoutInstitutionNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutInstitutionInput, Prisma.BookingUncheckedCreateWithoutInstitutionInput> | Prisma.BookingCreateWithoutInstitutionInput[] | Prisma.BookingUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutInstitutionInput | Prisma.BookingCreateOrConnectWithoutInstitutionInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutInstitutionInput | Prisma.BookingUpsertWithWhereUniqueWithoutInstitutionInput[];
    createMany?: Prisma.BookingCreateManyInstitutionInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutInstitutionInput | Prisma.BookingUpdateWithWhereUniqueWithoutInstitutionInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutInstitutionInput | Prisma.BookingUpdateManyWithWhereWithoutInstitutionInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type BookingUncheckedUpdateManyWithoutInstitutionNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutInstitutionInput, Prisma.BookingUncheckedCreateWithoutInstitutionInput> | Prisma.BookingCreateWithoutInstitutionInput[] | Prisma.BookingUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutInstitutionInput | Prisma.BookingCreateOrConnectWithoutInstitutionInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutInstitutionInput | Prisma.BookingUpsertWithWhereUniqueWithoutInstitutionInput[];
    createMany?: Prisma.BookingCreateManyInstitutionInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutInstitutionInput | Prisma.BookingUpdateWithWhereUniqueWithoutInstitutionInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutInstitutionInput | Prisma.BookingUpdateManyWithWhereWithoutInstitutionInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type BookingCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutUserInput, Prisma.BookingUncheckedCreateWithoutUserInput> | Prisma.BookingCreateWithoutUserInput[] | Prisma.BookingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutUserInput | Prisma.BookingCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.BookingCreateManyUserInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutUserInput, Prisma.BookingUncheckedCreateWithoutUserInput> | Prisma.BookingCreateWithoutUserInput[] | Prisma.BookingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutUserInput | Prisma.BookingCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.BookingCreateManyUserInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutUserInput, Prisma.BookingUncheckedCreateWithoutUserInput> | Prisma.BookingCreateWithoutUserInput[] | Prisma.BookingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutUserInput | Prisma.BookingCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutUserInput | Prisma.BookingUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.BookingCreateManyUserInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutUserInput | Prisma.BookingUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutUserInput | Prisma.BookingUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type BookingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutUserInput, Prisma.BookingUncheckedCreateWithoutUserInput> | Prisma.BookingCreateWithoutUserInput[] | Prisma.BookingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutUserInput | Prisma.BookingCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutUserInput | Prisma.BookingUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.BookingCreateManyUserInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutUserInput | Prisma.BookingUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutUserInput | Prisma.BookingUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type BookingCreateNestedManyWithoutResourceInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutResourceInput, Prisma.BookingUncheckedCreateWithoutResourceInput> | Prisma.BookingCreateWithoutResourceInput[] | Prisma.BookingUncheckedCreateWithoutResourceInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutResourceInput | Prisma.BookingCreateOrConnectWithoutResourceInput[];
    createMany?: Prisma.BookingCreateManyResourceInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUncheckedCreateNestedManyWithoutResourceInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutResourceInput, Prisma.BookingUncheckedCreateWithoutResourceInput> | Prisma.BookingCreateWithoutResourceInput[] | Prisma.BookingUncheckedCreateWithoutResourceInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutResourceInput | Prisma.BookingCreateOrConnectWithoutResourceInput[];
    createMany?: Prisma.BookingCreateManyResourceInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUpdateManyWithoutResourceNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutResourceInput, Prisma.BookingUncheckedCreateWithoutResourceInput> | Prisma.BookingCreateWithoutResourceInput[] | Prisma.BookingUncheckedCreateWithoutResourceInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutResourceInput | Prisma.BookingCreateOrConnectWithoutResourceInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutResourceInput | Prisma.BookingUpsertWithWhereUniqueWithoutResourceInput[];
    createMany?: Prisma.BookingCreateManyResourceInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutResourceInput | Prisma.BookingUpdateWithWhereUniqueWithoutResourceInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutResourceInput | Prisma.BookingUpdateManyWithWhereWithoutResourceInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type BookingUncheckedUpdateManyWithoutResourceNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutResourceInput, Prisma.BookingUncheckedCreateWithoutResourceInput> | Prisma.BookingCreateWithoutResourceInput[] | Prisma.BookingUncheckedCreateWithoutResourceInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutResourceInput | Prisma.BookingCreateOrConnectWithoutResourceInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutResourceInput | Prisma.BookingUpsertWithWhereUniqueWithoutResourceInput[];
    createMany?: Prisma.BookingCreateManyResourceInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutResourceInput | Prisma.BookingUpdateWithWhereUniqueWithoutResourceInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutResourceInput | Prisma.BookingUpdateManyWithWhereWithoutResourceInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type BookingCreateNestedOneWithoutRequestInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutRequestInput, Prisma.BookingUncheckedCreateWithoutRequestInput>;
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutRequestInput;
    connect?: Prisma.BookingWhereUniqueInput;
};
export type BookingUncheckedCreateNestedOneWithoutRequestInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutRequestInput, Prisma.BookingUncheckedCreateWithoutRequestInput>;
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutRequestInput;
    connect?: Prisma.BookingWhereUniqueInput;
};
export type BookingUpdateOneWithoutRequestNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutRequestInput, Prisma.BookingUncheckedCreateWithoutRequestInput>;
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutRequestInput;
    upsert?: Prisma.BookingUpsertWithoutRequestInput;
    disconnect?: Prisma.BookingWhereInput | boolean;
    delete?: Prisma.BookingWhereInput | boolean;
    connect?: Prisma.BookingWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BookingUpdateToOneWithWhereWithoutRequestInput, Prisma.BookingUpdateWithoutRequestInput>, Prisma.BookingUncheckedUpdateWithoutRequestInput>;
};
export type BookingUncheckedUpdateOneWithoutRequestNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutRequestInput, Prisma.BookingUncheckedCreateWithoutRequestInput>;
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutRequestInput;
    upsert?: Prisma.BookingUpsertWithoutRequestInput;
    disconnect?: Prisma.BookingWhereInput | boolean;
    delete?: Prisma.BookingWhereInput | boolean;
    connect?: Prisma.BookingWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BookingUpdateToOneWithWhereWithoutRequestInput, Prisma.BookingUpdateWithoutRequestInput>, Prisma.BookingUncheckedUpdateWithoutRequestInput>;
};
export type EnumBookingStatusFieldUpdateOperationsInput = {
    set?: $Enums.BookingStatus;
};
export type BookingCreateWithoutInstitutionInput = {
    id?: string;
    date: Date | string;
    startTime: Date | string;
    endTime: Date | string;
    purpose?: string | null;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    resource: Prisma.ResourceCreateNestedOneWithoutBookingsInput;
    user: Prisma.UserCreateNestedOneWithoutBookingsInput;
    request: Prisma.ServiceRequestCreateNestedOneWithoutBookingInput;
};
export type BookingUncheckedCreateWithoutInstitutionInput = {
    id?: string;
    resourceId: string;
    userId: string;
    requestId: string;
    date: Date | string;
    startTime: Date | string;
    endTime: Date | string;
    purpose?: string | null;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BookingCreateOrConnectWithoutInstitutionInput = {
    where: Prisma.BookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingCreateWithoutInstitutionInput, Prisma.BookingUncheckedCreateWithoutInstitutionInput>;
};
export type BookingCreateManyInstitutionInputEnvelope = {
    data: Prisma.BookingCreateManyInstitutionInput | Prisma.BookingCreateManyInstitutionInput[];
    skipDuplicates?: boolean;
};
export type BookingUpsertWithWhereUniqueWithoutInstitutionInput = {
    where: Prisma.BookingWhereUniqueInput;
    update: Prisma.XOR<Prisma.BookingUpdateWithoutInstitutionInput, Prisma.BookingUncheckedUpdateWithoutInstitutionInput>;
    create: Prisma.XOR<Prisma.BookingCreateWithoutInstitutionInput, Prisma.BookingUncheckedCreateWithoutInstitutionInput>;
};
export type BookingUpdateWithWhereUniqueWithoutInstitutionInput = {
    where: Prisma.BookingWhereUniqueInput;
    data: Prisma.XOR<Prisma.BookingUpdateWithoutInstitutionInput, Prisma.BookingUncheckedUpdateWithoutInstitutionInput>;
};
export type BookingUpdateManyWithWhereWithoutInstitutionInput = {
    where: Prisma.BookingScalarWhereInput;
    data: Prisma.XOR<Prisma.BookingUpdateManyMutationInput, Prisma.BookingUncheckedUpdateManyWithoutInstitutionInput>;
};
export type BookingScalarWhereInput = {
    AND?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
    OR?: Prisma.BookingScalarWhereInput[];
    NOT?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
    id?: Prisma.StringFilter<"Booking"> | string;
    institutionId?: Prisma.StringFilter<"Booking"> | string;
    resourceId?: Prisma.StringFilter<"Booking"> | string;
    userId?: Prisma.StringFilter<"Booking"> | string;
    requestId?: Prisma.StringFilter<"Booking"> | string;
    date?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    startTime?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    endTime?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    purpose?: Prisma.StringNullableFilter<"Booking"> | string | null;
    status?: Prisma.EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Booking"> | Date | string;
};
export type BookingCreateWithoutUserInput = {
    id?: string;
    date: Date | string;
    startTime: Date | string;
    endTime: Date | string;
    purpose?: string | null;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutBookingsInput;
    resource: Prisma.ResourceCreateNestedOneWithoutBookingsInput;
    request: Prisma.ServiceRequestCreateNestedOneWithoutBookingInput;
};
export type BookingUncheckedCreateWithoutUserInput = {
    id?: string;
    institutionId: string;
    resourceId: string;
    requestId: string;
    date: Date | string;
    startTime: Date | string;
    endTime: Date | string;
    purpose?: string | null;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BookingCreateOrConnectWithoutUserInput = {
    where: Prisma.BookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingCreateWithoutUserInput, Prisma.BookingUncheckedCreateWithoutUserInput>;
};
export type BookingCreateManyUserInputEnvelope = {
    data: Prisma.BookingCreateManyUserInput | Prisma.BookingCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type BookingUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.BookingWhereUniqueInput;
    update: Prisma.XOR<Prisma.BookingUpdateWithoutUserInput, Prisma.BookingUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.BookingCreateWithoutUserInput, Prisma.BookingUncheckedCreateWithoutUserInput>;
};
export type BookingUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.BookingWhereUniqueInput;
    data: Prisma.XOR<Prisma.BookingUpdateWithoutUserInput, Prisma.BookingUncheckedUpdateWithoutUserInput>;
};
export type BookingUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.BookingScalarWhereInput;
    data: Prisma.XOR<Prisma.BookingUpdateManyMutationInput, Prisma.BookingUncheckedUpdateManyWithoutUserInput>;
};
export type BookingCreateWithoutResourceInput = {
    id?: string;
    date: Date | string;
    startTime: Date | string;
    endTime: Date | string;
    purpose?: string | null;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutBookingsInput;
    user: Prisma.UserCreateNestedOneWithoutBookingsInput;
    request: Prisma.ServiceRequestCreateNestedOneWithoutBookingInput;
};
export type BookingUncheckedCreateWithoutResourceInput = {
    id?: string;
    institutionId: string;
    userId: string;
    requestId: string;
    date: Date | string;
    startTime: Date | string;
    endTime: Date | string;
    purpose?: string | null;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BookingCreateOrConnectWithoutResourceInput = {
    where: Prisma.BookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingCreateWithoutResourceInput, Prisma.BookingUncheckedCreateWithoutResourceInput>;
};
export type BookingCreateManyResourceInputEnvelope = {
    data: Prisma.BookingCreateManyResourceInput | Prisma.BookingCreateManyResourceInput[];
    skipDuplicates?: boolean;
};
export type BookingUpsertWithWhereUniqueWithoutResourceInput = {
    where: Prisma.BookingWhereUniqueInput;
    update: Prisma.XOR<Prisma.BookingUpdateWithoutResourceInput, Prisma.BookingUncheckedUpdateWithoutResourceInput>;
    create: Prisma.XOR<Prisma.BookingCreateWithoutResourceInput, Prisma.BookingUncheckedCreateWithoutResourceInput>;
};
export type BookingUpdateWithWhereUniqueWithoutResourceInput = {
    where: Prisma.BookingWhereUniqueInput;
    data: Prisma.XOR<Prisma.BookingUpdateWithoutResourceInput, Prisma.BookingUncheckedUpdateWithoutResourceInput>;
};
export type BookingUpdateManyWithWhereWithoutResourceInput = {
    where: Prisma.BookingScalarWhereInput;
    data: Prisma.XOR<Prisma.BookingUpdateManyMutationInput, Prisma.BookingUncheckedUpdateManyWithoutResourceInput>;
};
export type BookingCreateWithoutRequestInput = {
    id?: string;
    date: Date | string;
    startTime: Date | string;
    endTime: Date | string;
    purpose?: string | null;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutBookingsInput;
    resource: Prisma.ResourceCreateNestedOneWithoutBookingsInput;
    user: Prisma.UserCreateNestedOneWithoutBookingsInput;
};
export type BookingUncheckedCreateWithoutRequestInput = {
    id?: string;
    institutionId: string;
    resourceId: string;
    userId: string;
    date: Date | string;
    startTime: Date | string;
    endTime: Date | string;
    purpose?: string | null;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BookingCreateOrConnectWithoutRequestInput = {
    where: Prisma.BookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingCreateWithoutRequestInput, Prisma.BookingUncheckedCreateWithoutRequestInput>;
};
export type BookingUpsertWithoutRequestInput = {
    update: Prisma.XOR<Prisma.BookingUpdateWithoutRequestInput, Prisma.BookingUncheckedUpdateWithoutRequestInput>;
    create: Prisma.XOR<Prisma.BookingCreateWithoutRequestInput, Prisma.BookingUncheckedCreateWithoutRequestInput>;
    where?: Prisma.BookingWhereInput;
};
export type BookingUpdateToOneWithWhereWithoutRequestInput = {
    where?: Prisma.BookingWhereInput;
    data: Prisma.XOR<Prisma.BookingUpdateWithoutRequestInput, Prisma.BookingUncheckedUpdateWithoutRequestInput>;
};
export type BookingUpdateWithoutRequestInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutBookingsNestedInput;
    resource?: Prisma.ResourceUpdateOneRequiredWithoutBookingsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutBookingsNestedInput;
};
export type BookingUncheckedUpdateWithoutRequestInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BookingCreateManyInstitutionInput = {
    id?: string;
    resourceId: string;
    userId: string;
    requestId: string;
    date: Date | string;
    startTime: Date | string;
    endTime: Date | string;
    purpose?: string | null;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BookingUpdateWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resource?: Prisma.ResourceUpdateOneRequiredWithoutBookingsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutBookingsNestedInput;
    request?: Prisma.ServiceRequestUpdateOneRequiredWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BookingUncheckedUpdateManyWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BookingCreateManyUserInput = {
    id?: string;
    institutionId: string;
    resourceId: string;
    requestId: string;
    date: Date | string;
    startTime: Date | string;
    endTime: Date | string;
    purpose?: string | null;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BookingUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutBookingsNestedInput;
    resource?: Prisma.ResourceUpdateOneRequiredWithoutBookingsNestedInput;
    request?: Prisma.ServiceRequestUpdateOneRequiredWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BookingUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BookingCreateManyResourceInput = {
    id?: string;
    institutionId: string;
    userId: string;
    requestId: string;
    date: Date | string;
    startTime: Date | string;
    endTime: Date | string;
    purpose?: string | null;
    status?: $Enums.BookingStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BookingUpdateWithoutResourceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutBookingsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutBookingsNestedInput;
    request?: Prisma.ServiceRequestUpdateOneRequiredWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateWithoutResourceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BookingUncheckedUpdateManyWithoutResourceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BookingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    resourceId?: boolean;
    userId?: boolean;
    requestId?: boolean;
    date?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    purpose?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    resource?: boolean | Prisma.ResourceDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    request?: boolean | Prisma.ServiceRequestDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["booking"]>;
export type BookingSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    resourceId?: boolean;
    userId?: boolean;
    requestId?: boolean;
    date?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    purpose?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    resource?: boolean | Prisma.ResourceDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    request?: boolean | Prisma.ServiceRequestDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["booking"]>;
export type BookingSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    resourceId?: boolean;
    userId?: boolean;
    requestId?: boolean;
    date?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    purpose?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    resource?: boolean | Prisma.ResourceDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    request?: boolean | Prisma.ServiceRequestDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["booking"]>;
export type BookingSelectScalar = {
    id?: boolean;
    institutionId?: boolean;
    resourceId?: boolean;
    userId?: boolean;
    requestId?: boolean;
    date?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    purpose?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type BookingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "institutionId" | "resourceId" | "userId" | "requestId" | "date" | "startTime" | "endTime" | "purpose" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["booking"]>;
export type BookingInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    resource?: boolean | Prisma.ResourceDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    request?: boolean | Prisma.ServiceRequestDefaultArgs<ExtArgs>;
};
export type BookingIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    resource?: boolean | Prisma.ResourceDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    request?: boolean | Prisma.ServiceRequestDefaultArgs<ExtArgs>;
};
export type BookingIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    resource?: boolean | Prisma.ResourceDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    request?: boolean | Prisma.ServiceRequestDefaultArgs<ExtArgs>;
};
export type $BookingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Booking";
    objects: {
        institution: Prisma.$InstitutionPayload<ExtArgs>;
        resource: Prisma.$ResourcePayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
        request: Prisma.$ServiceRequestPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        institutionId: string;
        resourceId: string;
        userId: string;
        requestId: string;
        date: Date;
        startTime: Date;
        endTime: Date;
        purpose: string | null;
        status: $Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["booking"]>;
    composites: {};
};
export type BookingGetPayload<S extends boolean | null | undefined | BookingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BookingPayload, S>;
export type BookingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BookingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BookingCountAggregateInputType | true;
};
export interface BookingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Booking'];
        meta: {
            name: 'Booking';
        };
    };
    findUnique<T extends BookingFindUniqueArgs>(args: Prisma.SelectSubset<T, BookingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BookingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BookingFindFirstArgs>(args?: Prisma.SelectSubset<T, BookingFindFirstArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BookingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BookingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BookingFindManyArgs>(args?: Prisma.SelectSubset<T, BookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BookingCreateArgs>(args: Prisma.SelectSubset<T, BookingCreateArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BookingCreateManyArgs>(args?: Prisma.SelectSubset<T, BookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BookingCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BookingDeleteArgs>(args: Prisma.SelectSubset<T, BookingDeleteArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BookingUpdateArgs>(args: Prisma.SelectSubset<T, BookingUpdateArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BookingDeleteManyArgs>(args?: Prisma.SelectSubset<T, BookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BookingUpdateManyArgs>(args: Prisma.SelectSubset<T, BookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BookingUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BookingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BookingUpsertArgs>(args: Prisma.SelectSubset<T, BookingUpsertArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BookingCountArgs>(args?: Prisma.Subset<T, BookingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BookingCountAggregateOutputType> : number>;
    aggregate<T extends BookingAggregateArgs>(args: Prisma.Subset<T, BookingAggregateArgs>): Prisma.PrismaPromise<GetBookingAggregateType<T>>;
    groupBy<T extends BookingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BookingGroupByArgs['orderBy'];
    } : {
        orderBy?: BookingGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BookingFieldRefs;
}
export interface Prisma__BookingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    institution<T extends Prisma.InstitutionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InstitutionDefaultArgs<ExtArgs>>): Prisma.Prisma__InstitutionClient<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    resource<T extends Prisma.ResourceDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ResourceDefaultArgs<ExtArgs>>): Prisma.Prisma__ResourceClient<runtime.Types.Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    request<T extends Prisma.ServiceRequestDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ServiceRequestDefaultArgs<ExtArgs>>): Prisma.Prisma__ServiceRequestClient<runtime.Types.Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BookingFieldRefs {
    readonly id: Prisma.FieldRef<"Booking", 'String'>;
    readonly institutionId: Prisma.FieldRef<"Booking", 'String'>;
    readonly resourceId: Prisma.FieldRef<"Booking", 'String'>;
    readonly userId: Prisma.FieldRef<"Booking", 'String'>;
    readonly requestId: Prisma.FieldRef<"Booking", 'String'>;
    readonly date: Prisma.FieldRef<"Booking", 'DateTime'>;
    readonly startTime: Prisma.FieldRef<"Booking", 'DateTime'>;
    readonly endTime: Prisma.FieldRef<"Booking", 'DateTime'>;
    readonly purpose: Prisma.FieldRef<"Booking", 'String'>;
    readonly status: Prisma.FieldRef<"Booking", 'BookingStatus'>;
    readonly createdAt: Prisma.FieldRef<"Booking", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Booking", 'DateTime'>;
}
export type BookingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where: Prisma.BookingWhereUniqueInput;
};
export type BookingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where: Prisma.BookingWhereUniqueInput;
};
export type BookingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithRelationInput | Prisma.BookingOrderByWithRelationInput[];
    cursor?: Prisma.BookingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingScalarFieldEnum | Prisma.BookingScalarFieldEnum[];
};
export type BookingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithRelationInput | Prisma.BookingOrderByWithRelationInput[];
    cursor?: Prisma.BookingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingScalarFieldEnum | Prisma.BookingScalarFieldEnum[];
};
export type BookingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithRelationInput | Prisma.BookingOrderByWithRelationInput[];
    cursor?: Prisma.BookingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingScalarFieldEnum | Prisma.BookingScalarFieldEnum[];
};
export type BookingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BookingCreateInput, Prisma.BookingUncheckedCreateInput>;
};
export type BookingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BookingCreateManyInput | Prisma.BookingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BookingCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    data: Prisma.BookingCreateManyInput | Prisma.BookingCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BookingIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BookingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BookingUpdateInput, Prisma.BookingUncheckedUpdateInput>;
    where: Prisma.BookingWhereUniqueInput;
};
export type BookingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BookingUpdateManyMutationInput, Prisma.BookingUncheckedUpdateManyInput>;
    where?: Prisma.BookingWhereInput;
    limit?: number;
};
export type BookingUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BookingUpdateManyMutationInput, Prisma.BookingUncheckedUpdateManyInput>;
    where?: Prisma.BookingWhereInput;
    limit?: number;
    include?: Prisma.BookingIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BookingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where: Prisma.BookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingCreateInput, Prisma.BookingUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BookingUpdateInput, Prisma.BookingUncheckedUpdateInput>;
};
export type BookingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where: Prisma.BookingWhereUniqueInput;
};
export type BookingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
    limit?: number;
};
export type BookingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
};
export {};
