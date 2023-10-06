"""create client type table

Revision ID: 7185de8fea04
Revises: 82bc644eac4b
Create Date: 2023-10-06 18:56:14.766556

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7185de8fea04'
down_revision: Union[str, None] = '82bc644eac4b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'client_type',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('name', sa.String(64))
    )
    pass


def downgrade() -> None:
    op.drop_table('client_type')
    pass
